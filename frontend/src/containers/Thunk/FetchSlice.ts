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

interface ArtistState {
    allArtists: Artists[];
    certainAlbums: Albums[]
    loader: boolean;
    error: boolean;
}
const initialState: ArtistState = {
    allArtists: [],
    certainAlbums: [],
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

export const ArtistsSlice = createSlice({
    name:'Artist',
    initialState,
    reducers:{
        deleteComment: (state, action: PayloadAction<string>) => {
            state.allComments = state.allComments.filter(comment => comment.id !== action.payload);
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
        });
    },
})

export const ArtistsReducer = ArtistsSlice.reducer;
export const  {deleteComment}  = ArtistsSlice.actions;