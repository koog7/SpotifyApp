import express from "express";
import User from "../models/Users";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Tracks";
import Artist from "../models/Artists";
import Album from "../models/Albums";

const tracksHistoryRouter = express.Router();
tracksHistoryRouter.use(express.json());

tracksHistoryRouter.get('/', async (req, res) => {
    const getToken = req.get('Authorization');
    console.log(getToken);
    if (!getToken) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const [_Bearer, token] = getToken.split(' ');

        const user = await User.findOne({token: token});

        if (!user) {
            return res.status(400).send({error: 'User not found'});
        }

        const listenedTracks = await TrackHistory.find({userId: user._id.toString()}).sort({datetime: -1});;

        if (!listenedTracks || listenedTracks.length === 0) {
            return res.status(400).send({ error: 'Tracks not found' });
        }

        const trackIds = listenedTracks.map(track => track.trackId);

        const tracks = await Track.find({_id: {$in: trackIds}});

        if (!tracks || tracks.length === 0) {
            return res.status(400).send({error: 'Tracks not found'});
        }

        const result = await Promise.all(listenedTracks.map(async (listenedTrack) => {

            const track = tracks.find(t => t._id.toString() === listenedTrack.trackId.toString());
            if (!track) {
                return res.status(400).send({error: 'Track not found' });
            }

            const album = await Album.findById(track.albumId);
            if (!album) {
                return res.status(400).send({error: 'Album not found' });
            }

            const artist = await Artist.findById(album.artistId);
            if (!artist) {
                return res.status(400).send({error: 'Artist not found'});
            }

            return {
                trackId: track._id,
                title: track.title,
                artistName: artist.name,
                trackDuration: track.duration,
                listenedAt: listenedTrack.datetime,
            };
        }));

        res.send(result);

    } catch (e) {
        return res.status(400).send(e);
    }
});

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