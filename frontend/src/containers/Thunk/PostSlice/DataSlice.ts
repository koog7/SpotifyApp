import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUser, User} from "../AuthSlice.ts";
import {RootState} from "../../../app/store.ts";
import axiosAPI from "../../../axios/AxiosAPI.ts";

interface DataState{
    loader: boolean;
    error: null | string;
}
const initialState: DataState = {
    loader: false,
    error: null,
};

export const postArtist = createAsyncThunk<void , {name: string, info:string, photo : File , token:string} , { state: RootState }>('form/postArtist', async ({ name, info, photo, token }) => {
    try{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('info', info);
        formData.append('photo', photo);
        console.log(formData)
        // noinspection JSAnnotator
        await axiosAPI.post(`/artists` , formData , { headers: { 'Authorization': `Bearer ${token}` } });
    }catch (error) {
        console.error('Error:', error);
    }
});
export const postAlbum = createAsyncThunk<void , {title: string, artistId:string,dataRelease: string, photo : File , token:string} , { state: RootState }>('form/postAlbum', async ({ title, artistId , dataRelease, photo, token  }) => {
    try{
        const formData = new FormData();
        formData.append('title', title);
        formData.append('artistId', artistId);
        formData.append('dataRelease', dataRelease);
        formData.append('photo', photo);

        // noinspection JSAnnotator
        await axiosAPI.post(`/albums` , formData , { headers: { 'Authorization': `Bearer ${token}` } });
    }catch (error) {
        console.error('Error:', error);
    }
});

export const postTrack = createAsyncThunk<void , {title: string, albumId:string,duration: string , token:string} , { state: RootState }>('form/postTrack', async ({ title, albumId , duration, token  }) => {
    try{
        // noinspection JSAnnotator
        await axiosAPI.post(`/tracks` , { title, albumId, duration } , { headers: { 'Authorization': `Bearer ${token}` } });
    }catch (error) {
        console.error('Error:', error);
    }
});


export const patchArtist = createAsyncThunk<void ,  string , { state: RootState }>('form/patchArtistPublished', async (id) => {
    try{
        // noinspection JSAnnotator
        await axiosAPI.patch(`/artists/${id}/togglePublished`);
    }catch (error) {
        console.error('Error:', error);
    }
});

export const patchAlbum = createAsyncThunk<void , string , { state: RootState }>('form/patchAlbumPublished', async (id) => {
    try{
        // noinspection JSAnnotator
        await axiosAPI.patch(`/albums/${id}/togglePublished`);
    }catch (error) {
        console.error('Error:', error);
    }
});

export const patchTrack = createAsyncThunk<void , string , { state: RootState }>('form/patchTrackPublished', async (id) => {
    try{
        // noinspection JSAnnotator
        await axiosAPI.patch(`/tracks/${id}/togglePublished`);
    }catch (error) {
        console.error('Error:', error);
    }
});

export const deleteArtist = createAsyncThunk<void , string , { state: RootState }>('form/deleteArtist', async (id) => {
    try{
        // noinspection JSAnnotator
        await axiosAPI.delete(`/artists/${id}`);
    }catch (error) {
        console.error('Error:', error);
    }
});

export const deleteAlbum = createAsyncThunk<void , string , { state: RootState }>('form/deleteAlbum', async (id) => {
    try{
        // noinspection JSAnnotator
        await axiosAPI.delete(`/albums/${id}`);
    }catch (error) {
        console.error('Error:', error);
    }
});

export const deleteTracks = createAsyncThunk<void , string , { state: RootState }>('form/deleteTrack', async (id) => {
    try{
        // noinspection JSAnnotator
        await axiosAPI.delete(`/tracks/${id}`);
    }catch (error) {
        console.error('Error:', error);
    }
});
export const FormPost = createSlice({
    name: 'PostData',
    initialState,
    reducers:{
        err: (state) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postArtist.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(postArtist.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(postArtist.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(postAlbum.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(postAlbum.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(postAlbum.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(postTrack.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(postTrack.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(postTrack.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(patchArtist.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(patchArtist.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(patchArtist.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(patchAlbum.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(patchAlbum.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(patchAlbum.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(patchTrack.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(patchTrack.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(patchTrack.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(deleteArtist.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(deleteArtist.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(deleteArtist.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(deleteAlbum.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(deleteAlbum.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(deleteAlbum.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(deleteTracks.pending, (state: DataState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(deleteTracks.fulfilled, (state: DataState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(deleteTracks.rejected, (state: DataState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
    }
})

export const FormReducer = FormPost.reducer;