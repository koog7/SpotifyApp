import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Albums";
import Artist from "../models/Artists";
import Track from "../models/Tracks";


const albumsRouter = express.Router();
albumsRouter.use(express.json());

albumsRouter.post( '/albums', imagesUpload.single('photo'), async (req, res )=>{
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
                        trackCount: trackCount
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
                    trackCount: trackCount
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

export default albumsRouter;

