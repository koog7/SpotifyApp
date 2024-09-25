import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photo: String,
    info: String,
    isPublished:{
        type: Boolean,
        default: false,
        required: true,
    }
})

const Artist = mongoose.model('Artist' , ArtistsSchema);
export default Artist;