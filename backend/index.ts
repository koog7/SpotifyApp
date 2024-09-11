import express from 'express';
import mongoose from "mongoose";
import SpotifyRouter from "./routes/artistsRoutes";
import AlbumsRouter from "./routes/albumsRoutes";
import TracksRouter from "./routes/tracksRouter";
import authUserRouter from "./routes/authUserRouter";

const app = express();
const port = 8000;

app.use(express.json())
app.use('/', SpotifyRouter);
app.use('/', AlbumsRouter);
app.use('/', TracksRouter);
app.use('/users', authUserRouter);

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