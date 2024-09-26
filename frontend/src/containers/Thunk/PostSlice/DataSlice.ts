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
        console.log(name , info , photo , token)
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
    }
})

export const FormReducer = FormPost.reducer;