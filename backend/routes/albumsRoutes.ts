import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Albums";
import Artist from "../models/Artists";
import Track from "../models/Tracks";
import authCheck from "../middleware/authCheck";
import permit from "../middleware/permit";
import artistsRouter from "./artistsRoutes";


const albumsRouter = express.Router();
albumsRouter.use(express.json());

albumsRouter.post( '/albums', authCheck, imagesUpload.single('photo'), async (req, res )=>{
    try {
        const ArtistObject = new Album({
            title: req.body.title,
            artistId: req.body.artistId,
            dataRelease: req.body.dataRelease,
            photo: req.file ? req.file.filename : null,
        })

        await ArtistObject.save()
        res.send(ArtistObject)
    }catch (e) {
        res.send('cant be created')
    }
});


albumsRouter.get( '/albums', async (req, res )=>{
    const {artist} = req.query;

    if(artist){
        try {
            const albums = await Album.find({artistId: artist}).sort({ dataRelease: -1 });

            const albumInfo = await Promise.all(
                albums.map(async (album) => {
                    const trackCount = await Track.countDocuments({ albumId: album._id });
                    return {
                        _id: album._id,
                        title: album.title,
                        dataRelease: album.dataRelease,
                        photo: album.photo,
                        trackCount: trackCount,
                        isPublished: album.isPublished,
                    };
                })
            );

            res.send(albumInfo)
        }catch (e) {
            res.send('cant find artist')
        }
    }else {
        const albums = await Album.find();

        const albumInfo = await Promise.all(
            albums.map(async (album) => {
                const trackCount = await Track.countDocuments({ albumId: album._id });
                return {
                    _id: album._id,
                    title: album.title,
                    dataRelease: album.dataRelease,
                    photo: album.photo,
                    trackCount: trackCount,
                    isPublished: album.isPublished,
                };
            })
        );
        res.send(albumInfo)
    }
});

albumsRouter.get( '/albums/:id', async (req, res )=>{
    const {id} = req.params;

    if(!id){
        return res.status(400).json('Invalid ID');
    }

    try {
        const album = await Album.findOne({ _id: id });

        if(!album){
            return res.status(400).json('Album not found');
        }

        const artist = await Artist.findOne({_id: album.artistId });

        if(!artist){
            return res.status(400).json('Artist not found');
        }

        const allInfo = {
            name: artist.name,
            info: artist.info,
            photoAuthor: artist.photo,
            album: album.title,
            photo: album.photo,
            dataRelease: album.dataRelease,

        }
        res.send(allInfo)

    }catch (e) {
        console.log(e)
    }
});

albumsRouter.delete('/albums/:id', authCheck , permit('admin') , async (req ,res) =>{
    const {id} = req.params;

    if(!id){
        return res.status(400).send({error:'Album cant be deleted'})
    }

    await Album.findByIdAndDelete(id)
    res.send({success : 'Deleted!'})
})



albumsRouter.patch('/albums/:id/togglePublished', authCheck, permit('admin'), async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: 'Album cannot be edited' });
    }

    try {
        const findAlbum = await Album.findOne({ _id: id });

        if (!findAlbum) {
            return res.status(404).send({ error: 'Album not found' });
        }

        findAlbum.isPublished = !findAlbum.isPublished;

        await findAlbum.save();
        res.send({ success: 'Patched' });
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' });
    }
});
export default albumsRouter;

