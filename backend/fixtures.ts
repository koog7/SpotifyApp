import mongoose from "mongoose";
import Artist from "./models/Artists";
import Album from "./models/Albums";

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/spotifyAPI');
    const db = mongoose.connection;
    try {
        await db.dropCollection('artists')
        await db.dropCollection('albums')
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
            photo: 'artistWeeknd.jpeg',
            info: 'Canadian singer, songwriter, and record producer',
        }
    ]);


    await Album.create([
        {
            artistId: '66e1a8f62a4dfa83326da082',
            dataRelease: 2020,
            photo: 'AfterHours.jpg',
            title: 'After Hours'
        },
        {
            artistId: '66e1a8f62a4dfa83326da082',
            dataRelease: 2016,
            photo: 'StarBoy.jpeg',
            title: 'Star Boy'
        },
        {
            artistId: '66e1a8f62a4dfa83326da081',
            dataRelease: 2021,
            photo: 'HappierThanEver.jpeg',
            title: 'Happier Than Ever'
        },
        {
            artistId: '66e1a8f62a4dfa83326da081',
            dataRelease: 2016,
            photo: 'FallAsleep.png',
            title: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?'
        },
        {
            artistId: '66e1a8f62a4dfa83326da080',
            dataRelease: 2020,
            photo: 'OliverAlbum.jpeg',
            title: 'Ugly is Beautiful: Shorter, Tricker & Uglier (Deluxe)'
        },
        {
            artistId: '66e1a8f62a4dfa83326da080',
            dataRelease: 2022,
            photo: 'CowboyTears.png',
            title: 'Cowboy Tears'
        },
    ]);




    await db.close();
}

run().catch(console.error)