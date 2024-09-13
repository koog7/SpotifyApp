import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";
import {RootState} from "../../app/store.ts";

interface Artists{
    _id: string;
    name: string;
    photo: string;
    info: string;
}

interface Albums{
    _id: string;
    artistId: string;
    dataRelease: number;
    photo: string;
    title: string;
}
interface Tracks{
    _id: string;
    title: string;
    albumId: string;
    duration: string;
    album: {
        title: string;
        "dataRelease": number,
        photo: string;
    };
    user:{
        name: string;
    }
}

interface ArtistState {
    allArtists: Artists[];
    certainAlbums: Albums[];
    allTracks: Tracks[]
    loader: boolean;
    error: boolean;
}
const initialState: ArtistState = {
    allArtists: [],
    certainAlbums: [],
    allTracks: [],
    loader: false,
    error: false,
};


export const getArtists = createAsyncThunk<Artists[], { state: RootState }>('artist/getDataArtists', async () => {
    try{
        const response = await axiosAPI.get(`/artists`);
        return response.data.map(item => ({
            _id: item._id,
            name: item.name,
            photo: item.photo,
            info: item.info,
        }));
    }catch (error) {
        console.error('Error:', error);
    }
});

export const getAlbums = createAsyncThunk<Albums[], string , { state: RootState }>('artist/getAlbums', async (id: string) => {
    try{
        const response = await axiosAPI.get(`/albums?artist=${id}`);
        console.log(response.status , response.data)
        return response.data.map(item => ({
            _id: item._id,
            artistId: item.artistId,
            dataRelease: item.dataRelease,
            photo: item.photo,
            title: item.title,
        }));
    }catch (error) {
        console.error('Error:', error);
    }
});


export const getTracks = createAsyncThunk<Tracks[], string , { state: RootState }>('artist/getTracks', async (id: string) => {
    try{
        const response = await axiosAPI.get(`/tracks?album=${id}`);
        return response.data;
    }catch (error) {
        console.error('Error:', error);
    }
});

export const ArtistsSlice = createSlice({
    name:'Artist',
    initialState,
    reducers:{
        err: (state) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getArtists.pending, (state: ArtistState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(getArtists.fulfilled, (state: ArtistState, action) => {
            state.allArtists = action.payload;
            state.loader = false;
        });
        builder.addCase(getArtists.rejected, (state: ArtistState) => {
            state.loader = false;
            state.error = true;
        });
        builder.addCase(getAlbums.pending, (state: ArtistState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(getAlbums.fulfilled, (state: ArtistState, action) => {
            state.certainAlbums = action.payload;
            state.loader = false;
        });
        builder.addCase(getAlbums.rejected, (state: ArtistState) => {
            state.loader = false;
            state.error = true;
        })
        builder.addCase(getTracks.pending, (state: ArtistState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(getTracks.fulfilled, (state: ArtistState, action) => {
            state.allTracks = action.payload;
            state.loader = false;
        });
        builder.addCase(getTracks.rejected, (state: ArtistState) => {
            state.loader = false;
            state.error = true;
        });
    },
})

export const ArtistsReducer = ArtistsSlice.reducer;
export const  {err}  = ArtistsSlice.actions;