import mongoose from "mongoose";
import Artist from "./models/Artists";

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/spotifyAPI');
    const db = mongoose.connection;
    try {
        await db.dropCollection('artists')
    }catch (e) {
        console.log(e)
    }

    await Artist.create([
        {
            name: 'Oliver Tree',
            photo: 'artistOliver.jpg',
            info: 'American singer-songwriter, record producer, and filmmaker',
        },
        {
            name: 'Billie Eilish',
            photo: 'artistBillie.jpeg',
            info: 'American singer and songwriter',
        },
        {
            name: 'The Weeknd',
            photo: 'artistWeeknd.jpg',
            info: 'Canadian singer, songwriter, and record producer',
        }
    ]);

    await db.close();
}

run().catch(console.error)