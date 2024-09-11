import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TracksHistorySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trackId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
    },
    datetime:{
        type: String,
    }
})

const TrackHistory = mongoose.model('TrackHistory' , TracksHistorySchema);
export default TrackHistory;