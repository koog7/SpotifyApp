import express from "express";
import Track from "../models/Tracks";
import Album from "../models/Albums";
import Artist from "../models/Artists";
import authCheck from "../middleware/authCheck";
import permit from "../middleware/permit";
import albumsRouter from "./albumsRoutes";

const tracksRouter = express.Router();
tracksRouter.use(express.json());

tracksRouter.post( '/tracks', authCheck, async (req, res )=>{
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

tracksRouter.delete('/tracks/:id' , authCheck , permit('admin'), async (req, res )=>{
    const {id} = req.params;

    if(!id){
        return res.status(400).send({error:'Track cant be deleted'})
    }

    await Track.findByIdAndDelete(id)
    res.send({success : 'Deleted!'})
})


tracksRouter.patch('/tracks/:id/togglePublished', authCheck, permit('admin'), async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: 'Track cannot be edited' });
    }

    try {
        const findTrack = await Track.findOne({ _id: id });

        if (!findTrack) {
            return res.status(404).send({ error: 'Track not found' });
        }

        findTrack.isPublished = !findTrack.isPublished;

        await findTrack.save();
        res.send({ success: 'Patched' });
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' });
    }
});
export default tracksRouter;
