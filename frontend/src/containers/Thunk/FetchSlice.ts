import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";
import {RootState} from "../../app/store.ts";

export interface User{
    _id: string,
    username: string,
    token: string,
}
interface LoginData {
    username: string;
    password: string;
}
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
    trackCount: number;
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
    allTracks: Tracks[];
    user: User | null;
    loader: boolean;
    error: boolean;
}
const initialState: ArtistState = {
    allArtists: [],
    certainAlbums: [],
    allTracks: [],
    user: null,
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
        return response.data.map(item => ({
            _id: item._id,
            dataRelease: item.dataRelease,
            photo: item.photo,
            title: item.title,
            trackCount: item.trackCount
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

export const loginUser = createAsyncThunk<User , LoginData , { state: RootState }>('users/singIn', async (loginData: { username: string; password: string }) => {
    try{
        const response = await axiosAPI.post(`/users` , loginData);
        return response.data;
    }catch (error) {
        console.error('Error:', error);
    }
});

export const authorizationUser = createAsyncThunk<User , LoginData , { state: RootState }>('users/singUp', async (loginData: { username: string; password: string }) => {
    try{
        const response = await axiosAPI.post(`/users/sessions` , loginData);
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
        })
        builder.addCase(loginUser.pending, (state: ArtistState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(loginUser.fulfilled, (state: ArtistState, action) => {
            state.user = action.payload;
            state.loader = false;
        });
        builder.addCase(loginUser.rejected, (state: ArtistState) => {
            state.loader = false;
            state.error = true;
        })
        builder.addCase(authorizationUser.pending, (state: ArtistState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(authorizationUser.fulfilled, (state: ArtistState, action) => {
            state.user = action.payload;
            state.loader = false;
            console.log(state.user)
        });
        builder.addCase(authorizationUser.rejected, (state: ArtistState) => {
            state.loader = false;
            state.error = true;
        });
    },
})

export const ArtistsReducer = ArtistsSlice.reducer;
export const  {err}  = ArtistsSlice.actions;