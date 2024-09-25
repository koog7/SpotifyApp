import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    dataRelease: {
        type: Number,
        required: true,
    },
    photo: String,
    isPublished:{
        type: Boolean,
        default: false,
        required: true,
    }
})

const Album = mongoose.model('Album' , AlbumsSchema);
export default Album;