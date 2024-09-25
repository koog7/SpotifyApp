import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TracksSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    albumId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    numberTrack:{
        type: Number,
        required: true,
    },
    isPublished:{
        type: Boolean,
        default: false,
        required: true,
    }
})

const Track = mongoose.model('Track' , TracksSchema);
export default Track;