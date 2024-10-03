import mongoose from "mongoose";
import Artist from "./models/Artists";
import Album from "./models/Albums";
import Track from "./models/Tracks";
import User from "./models/Users";
import {randomUUID} from "crypto";

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/spotifyAPI');
    const db = mongoose.connection;
    try {
        await db.dropCollection('artists')
        await db.dropCollection('albums')
        await db.dropCollection('tracks')
        await db.dropCollection('users')
        await db.dropCollection('trackhistories')
    }catch (e) {
        console.log(e)
    }

    await User.create([
        {
            username:'User1',
            password:'password1',
            displayName:'User',
            avatar:'user.webp',
            token:randomUUID(),
            role: 'user'
        },
        {
            username:'Admin1',
            password:'password2',
            displayName:'Admin',
            avatar:'admin.png',
            token:randomUUID(),
            role: 'admin'
        }
    ])

    const artists = await Artist.create([
        {
            name: 'Oliver Tree',
            photo: 'artistOliver.jpg',
            info: 'American singer-songwriter, record producer, and filmmaker',
            isPublished: true,
        },
        {
            name: 'Billie Eilish',
            photo: 'artistBillie.jpeg',
            info: 'American singer and songwriter',
            isPublished: true,
        },
        {
            name: 'The Weeknd',
            photo: 'artistWeeknd.jpeg',
            info: 'Canadian singer, songwriter, and record producer',
            isPublished: true,
        },
        {
            name: 'Lil Uzi Vert',
            photo: 'artistLilUziVert.jpeg',
            info: 'American rapper, singer, and songwriter.',
            isPublished: false,
        }
    ]);


    const [oliverTree, billieEilish, theWeeknd , lilUziVert] = artists;

    const albums = await Album.create([
        {
            artistId: theWeeknd._id,
            dataRelease: 2020,
            photo: 'AfterHours.jpg',
            title: 'After Hours',
            isPublished: true,
        },
        {
            artistId: theWeeknd._id,
            dataRelease: 2016,
            photo: 'StarBoy.jpeg',
            title: 'Star Boy',
            isPublished: true,
        },
        {
            artistId: billieEilish._id,
            dataRelease: 2021,
            photo: 'HappierThanEver.jpeg',
            title: 'Happier Than Ever',
            isPublished: true,
        },
        {
            artistId: billieEilish._id,
            dataRelease: 2016,
            photo: 'FallAsleep.png',
            title: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
            isPublished: true,
        },
        {
            artistId: oliverTree._id,
            dataRelease: 2020,
            photo: 'OliverAlbum.jpeg',
            title: 'Ugly is Beautiful: Shorter, Tricker & Uglier (Deluxe)',
            isPublished: true,
        },
        {
            artistId: oliverTree._id,
            dataRelease: 2022,
            photo: 'CowboyTears.png',
            title: 'Cowboy Tears',
            isPublished: true,
        },
        {
            artistId: lilUziVert._id,
            dataRelease: 2024,
            photo: 'unpublishedUziAlbum.jpeg',
            title: 'Lost in the Vortex',
            isPublished: false,
        }
    ]);

    const [afterHours, starBoy, happierThanEver, fallAsleep, uglyIsBeautiful, cowboyTears , unpublishedUziAlbum] = albums;

    await Track.create([
        // After Hours (The Weeknd)
        {
            albumId: afterHours._id,
            title: 'Alone Again',
            duration: '4:10',
            numberTrack: 1,
            isPublished: true,
        },
        {
            albumId: afterHours._id,
            title: 'Too Late',
            duration: '3:58',
            numberTrack: 2,
            isPublished: true,
        },
        {
            albumId: afterHours._id,
            title: 'Hardest to Love',
            duration: '3:31',
            numberTrack: 3,
            isPublished: true,
        },
        {
            albumId: afterHours._id,
            title: 'Scared to Live',
            duration: '3:40',
            numberTrack: 4,
            isPublished: true,
        },
        {
            albumId: afterHours._id,
            title: 'Snowchild',
            duration: '4:09',
            numberTrack: 5,
            isPublished: true,
        },

        // Star Boy (The Weeknd)
        {
            albumId: starBoy._id,
            title: 'Starboy',
            duration: '3:50',
            numberTrack: 1,
            isPublished: true,
        },
        {
            albumId: starBoy._id,
            title: 'Party Monster',
            duration: '4:09',
            numberTrack: 2,
            isPublished: true,
        },
        {
            albumId: starBoy._id,
            title: 'False Alarm',
            duration: '3:40',
            numberTrack: 3,
            isPublished: true,
        },
        {
            albumId: starBoy._id,
            title: 'Reminder',
            duration: '3:38',
            numberTrack: 4,
            isPublished: true,
        },
        {
            albumId: starBoy._id,
            title: 'Rockin\'',
            duration: '3:52',
            numberTrack: 5
        },

        // Happier Than Ever (Billie Eilish)
        {
            albumId: happierThanEver._id,
            title: 'Getting Older',
            duration: '4:04',
            numberTrack: 1,
            isPublished: true,
        },
        {
            albumId: happierThanEver._id,
            title: 'I Didn\'t Change My Number',
            duration: '2:39',
            numberTrack: 2,
            isPublished: true,
        },
        {
            albumId: happierThanEver._id,
            title: 'Billie Bossa Nova',
            duration: '3:16',
            numberTrack: 3,
            isPublished: true,
        },
        {
            albumId: happierThanEver._id,
            title: 'my future',
            duration: '3:30',
            numberTrack: 4,
            isPublished: true,
        },
        {
            albumId: happierThanEver._id,
            title: 'Oxytocin',
            duration: '3:30',
            numberTrack: 5,
            isPublished: true,
        },

        // WHEN WE ALL FALL ASLEEP, WHERE DO WE GO? (Billie Eilish)
        {
            albumId: fallAsleep._id,
            title: '!!!!!!!',
            duration: '0:13',
            numberTrack: 1,
            isPublished: true,
        },
        {
            albumId: fallAsleep._id,
            title: 'bad guy',
            duration: '3:14',
            numberTrack: 2,
            isPublished: true,
        },
        {
            albumId: fallAsleep._id,
            title: 'xanny',
            duration: '4:03',
            numberTrack: 3,
            isPublished: true,
        },
        {
            albumId: fallAsleep._id,
            title: 'you should see me in a crown',
            duration: '3:00',
            numberTrack: 4,
            isPublished: true,
        },
        {
            albumId: fallAsleep._id,
            title: 'all the good girls go to hell',
            duration: '2:49',
            numberTrack: 5,
            isPublished: true,
        },

        // Ugly is Beautiful (Oliver Tree)
        {
            albumId: uglyIsBeautiful._id,
            title: 'Me, Myself & I',
            duration: '3:34',
            numberTrack: 1,
            isPublished: true,
        },
        {
            albumId: uglyIsBeautiful._id,
            title: 'Jerk',
            duration: '2:20',
            numberTrack: 2,
            isPublished: true,
        },
        {
            albumId: uglyIsBeautiful._id,
            title: 'Alien Boy',
            duration: '2:46',
            numberTrack: 3,
            isPublished: true,
        },
        {
            albumId: uglyIsBeautiful._id,
            title: 'Let Me Down',
            duration: '2:49',
            numberTrack: 4,
            isPublished: true,
        },
        {
            albumId: uglyIsBeautiful._id,
            title: 'Bury Me Alive',
            duration: '3:18',
            numberTrack: 5,
            isPublished: true,
        },

        // Cowboy Tears (Oliver Tree)
        {
            albumId: cowboyTears._id,
            title: 'Cabin Fever',
            duration: '2:45',
            numberTrack: 1,
            isPublished: true,
        },
        {
            albumId: cowboyTears._id,
            title: 'Cowboys Don\'t Cry',
            duration: '2:43',
            numberTrack: 2,
            isPublished: true,
        },
        {
            albumId: cowboyTears._id,
            title: 'Freaks & Geeks',
            duration: '3:14',
            numberTrack: 3,
            isPublished: true,
        },
        {
            albumId: cowboyTears._id,
            title: 'Miss You Like Crazy',
            duration: '2:55',
            numberTrack: 4,
            isPublished: true,
        },
        {
            albumId: cowboyTears._id,
            title: 'Headphones',
            duration: '2:47',
            numberTrack: 5,
            isPublished: true,
        },
        {
            albumId: unpublishedUziAlbum._id,
            title: 'Echoes in the Night',
            duration: '3:25',
            numberTrack: 1,
            isPublished: false,
        },
        {
            albumId: unpublishedUziAlbum._id,
            title: 'Gravity Falls',
            duration: '4:05',
            numberTrack: 2,
            isPublished: false,
        },
        {
            albumId: unpublishedUziAlbum._id,
            title: 'Beyond the Stars',
            duration: '2:40',
            numberTrack: 3,
            isPublished: false,
        },
    ]);

    await db.close();
}
run().catch(console.error)