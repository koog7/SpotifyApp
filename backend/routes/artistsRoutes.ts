import express from "express";
import {imagesUpload} from "../multer";
import Artist from "../models/Artists";

const artistsRouter = express.Router();
artistsRouter.use(express.json());

artistsRouter.post( '/artists', imagesUpload.single('photo'), async (req, res )=>{
    try {
        const ArtistObject = new Artist({
            name: req.body.name,
            photo: req.file ? req.file.filename : null,
            info: req.body.info ? req.body.info : null,
        })

        await ArtistObject.save()
        res.send(ArtistObject)
    }catch (e) {
        res.send('cant be created')
    }
});

artistsRouter.get( '/artists', async (req, res )=>{
    try {
        const artists = await Artist.find();

        const artistInfo = artists.map(artist => ({
            _id: artist._id,
            name: artist.name,
            info: artist.info,
            photo: artist.photo
        }));

        res.send(artistInfo)
    }catch (e) {
        res.send('cant get data about artists')
    }
});


export default artistsRouter;