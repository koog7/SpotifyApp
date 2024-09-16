import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "./FetchSlice.ts";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface FetchData {
    token:string,
    trackId:string,
}
interface ArtistState {
    loader: boolean;
    error: boolean;
}

const initialState: ArtistState = {
    loader: false,
    error: false,
};

export const postTrack = createAsyncThunk<User , FetchData , { state: RootState }>('track/TrackHistory', async (trackData: { token: string; trackId: string }) => {
    try{
        // noinspection JSAnnotator
        const response = await axiosAPI.post(`/track_history` , trackData , { headers: { 'Authorization': `Bearer ${trackData.token}` } });
        return response.data;
    }catch (error) {
        console.error('Error:', error);
    }
});

export const TrackHistorySlice = createSlice({
    name:'TrackHistory',
    initialState,
    reducers:{
        err: (state) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postTrack.pending, (state: ArtistState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(postTrack.fulfilled, (state: ArtistState) => {
            state.loader = false;
        });
        builder.addCase(postTrack.rejected, (state: ArtistState) => {
            state.loader = false;
            state.error = true;
        });
    }
})


export const TrackHistoryReducer = TrackHistorySlice.reducer;