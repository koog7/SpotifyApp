import express from "express";
import {imagesUpload} from "../multer";
import Artist from "../models/Artists";
import authCheck, {RequestWithUser} from "../middleware/authCheck";
import permit from "../middleware/permit";

const artistsRouter = express.Router();
artistsRouter.use(express.json());

artistsRouter.post( '/artists', authCheck , imagesUpload.single('photo'), async (req: RequestWithUser, res )=>{

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

artistsRouter.delete('/artists/:id', authCheck , permit('admin') , async (req ,res) =>{
    const {id} = req.params;

    if(!id){
        return res.status(400).send({error:'Artist cant be deleted'})
    }

    await Artist.findByIdAndDelete(id)
    res.send({success : 'Deleted!'})
})

artistsRouter.patch('/artists/:id/togglePublished', authCheck, permit('admin'), async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: 'Artist cannot be edited' });
    }

    try {
        const findArtist = await Artist.findOne({ _id: id });

        if (!findArtist) {
            return res.status(404).send({ error: 'Artist not found' });
        }

        findArtist.isPublished = !findArtist.isPublished;

        await findArtist.save();
        res.send({ success: 'Patched' });
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' });
    }
});
export default artistsRouter;