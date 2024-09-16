import express from "express";
import User from "../models/Users";
import TrackHistory from "../models/TrackHistory";

const tracksHistoryRouter = express.Router();
tracksHistoryRouter.use(express.json());

tracksHistoryRouter.post( '/', async (req, res )=>{
    const getToken = req.get('Authorization');
    const trackId = req.body.trackId;
    if(!getToken){
        return res.status(401).send({error: 'Unauthorized'});
    }
    try {

        const [_Bearer , token] = getToken.split(' ');

        const user = await User.findOne({token:token});

        if(!user){
            return res.status(400).send({error:'User not found'})
        }

        const userHistory = new TrackHistory({
            userId: user._id,
            trackId: trackId,
            datetime: new Date().toISOString(),
        });

        await userHistory.save()

        res.send(userHistory)
    }catch (e) {
        res.send('cant be added in history')
    }
});

export default tracksHistoryRouter;