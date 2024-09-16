import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "./FetchSlice.ts";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface FetchData {
    token:string,
    trackId:string,
}

interface tracksInfo {
    trackId: string,
    title: string,
    artistName: string,
    trackDuration: string,
    listenedAt:string,

}
interface TracksState {
    allTracks: tracksInfo[];
    loader: boolean;
    error: boolean;
}

const initialState: TracksState = {
    allTracks: [],
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

export const getTrack = createAsyncThunk<tracksInfo[] , string , { state: RootState }>('track/getTrackHistory', async (token) => {
    try{
        // noinspection JSAnnotator
        const response = await axiosAPI.get(`/track_history` , { headers: { 'Authorization': `Bearer ${token}` } });
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
        builder.addCase(postTrack.pending, (state: TracksState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(postTrack.fulfilled, (state: TracksState) => {
            state.loader = false;
        });
        builder.addCase(postTrack.rejected, (state: TracksState) => {
            state.loader = false;
            state.error = true;
        })
        builder.addCase(getTrack.pending, (state: TracksState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(getTrack.fulfilled, (state: TracksState , action) => {
            state.loader = false;
            state.allTracks = action.payload;
        });
        builder.addCase(getTrack.rejected, (state: TracksState) => {
            state.loader = false;
            state.error = true;
        });
    }
})


export const TrackHistoryReducer = TrackHistorySlice.reducer;