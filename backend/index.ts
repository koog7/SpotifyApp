import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import SpotifyRouter from "./routes/artistsRoutes";
import AlbumsRouter from "./routes/albumsRoutes";
import TracksRouter from "./routes/tracksRouter";
import authUserRouter from "./routes/authUserRouter";
import tracksHistoryRouter from "./routes/trackHistory";


const app = express();
const port = 8000;

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/', SpotifyRouter);
app.use('/', AlbumsRouter);
app.use('/', TracksRouter);
app.use('/users', authUserRouter);
app.use('/track_history', tracksHistoryRouter);
const run = async () => {

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/spotifyAPI');
        console.log('Connected to MongoDB');
    }catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }

    app.listen(port, () => {
        console.log('We are live on http://localhost:' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run()