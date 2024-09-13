import express from "express";
import Track from "../models/Tracks";
import User from "../models/Users";
import TrackHistory from "../models/TrackHistory";
import Album from "../models/Albums";
import Artist from "../models/Artists";

const tracksRouter = express.Router();
tracksRouter.use(express.json());

tracksRouter.post( '/tracks', async (req, res )=>{
    try {
        const TrackObject = new Track({
            title: req.body.title,
            albumId: req.body.albumId,
            duration: req.body.duration,
        })

        await TrackObject.save()
        res.send(TrackObject)
    }catch (e) {
        res.send('cant be created')
    }
});

tracksRouter.get( '/tracks', async (req, res )=>{
    const {album} = req.query;

    if(album){
        try {
            const tracks = await Track.find({albumId: album});
            const getInfoAlbum = await Album.findById(album)

            console.log(getInfoAlbum)
            if (!getInfoAlbum) {
                return res.status(400).send({error: 'Album not found'});
            }

            const getInfoArtist = await Artist.findById(getInfoAlbum.artistId);

            if (!getInfoArtist) {
                return res.status(400).send({error: 'Problem with fetching user'});
            }

            const trackInfo = tracks.map(track => ({
                _id: track._id,
                title: track.title,
                albumId: track.albumId,
                duration: track.duration,
                numberTrack: track.numberTrack,
                album: {
                    title: getInfoAlbum.title,
                    dataRelease: getInfoAlbum.dataRelease,
                    photo: getInfoAlbum.photo,
                },
                user:{
                    name: getInfoArtist.name
                }
            }));

            res.send(trackInfo)
        }catch (e) {
            res.send('cant find track')
        }
    }else {
        const tracks = await Track.find();

        const trackInfo = tracks.map(album => ({
            _id: album._id,
            albumId: album.albumId,
            title: album.title,
            duration: album.duration,
        }));

        res.send(trackInfo)
    }


});



tracksRouter.post( '/track_history', async (req, res )=>{
    const token = req.get('Authorization');
    const trackId = req.body.trackId;
    if(!token){
        return res.status(401).send({error: 'Unauthorized'});
    }
    try {
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

export default tracksRouter;
