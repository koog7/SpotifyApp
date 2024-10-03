import express from "express";
import User from "../models/Users";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import {imagesUpload} from "../multer";

const authUserRouter = express.Router();
authUserRouter.use(express.json());
const googleClient = new OAuth2Client(config.google.clientId)

authUserRouter.post( '/' , imagesUpload.single('avatar') , async (req, res, next )=>{
    try {

        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).send({ message: 'Username already taken' });
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file?.filename,
            token: randomUUID(),
        })

        await user.save()
        res.send(user)
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            return res.status(400).send(e)
        }
        return next(e)
    }
});
authUserRouter.post('/sessions' , async (req, res, next) => {
    try {

        const user = await User.findOne({username: req.body.username})

        if(!user){
            return res.status(400).send({error:'User or password are wrong'})
        }

        const comparePswrd = await bcrypt.compare(req.body.password , user.password)

        if(!comparePswrd){
            return res.status(400).send({error:'User or password are wrong'})
        }

        user.token = randomUUID();

        await user.save()
        res.send(user)
    }catch (e) {
        next(e)
    }
})

authUserRouter.post('/google' , async(req , res , next) => {
    try{
        const ticket = await googleClient.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({ error: "Google login error!" });
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const avatar = payload.picture;

        if (!email) {
            return res.status(400).send({ error: "Not enough user data to continue" });
        }

        let user = await User.findOne({googleID: id}).exec()

        if (!user) {
             const newUser = new User({
                username: email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName: displayName,
                avatar: avatar,
                token: randomUUID(),
            });
            await newUser.save();
            user = newUser;
        }

        return res.send({ message: "Login with Google successful!", user });
    }catch (e) {
        return next(e)
    }
})

authUserRouter.delete('/sessions', async (req, res, next) => {
    try {
        const getToken = req.get('Authorization');
        const success = {message: 'Success'};

        if (!getToken) return res.send(success);

        const [_Bearer , token] = getToken.split(' ');

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.token = randomUUID();
        user.save();

        return res.send(success);
    } catch (e) {
        return next(e);
    }
});
export default authUserRouter;