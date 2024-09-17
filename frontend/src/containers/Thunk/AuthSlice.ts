import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

export interface User{
    _id: string,
    username: string,
    token: string,
}
interface LoginData {
    username: string;
    password: string;
}

interface UserState {
    user: User | null;
    loader: boolean;
    error: boolean;
}

const initialState: UserState = {
    user: null,
    loader: false,
    error: false,
};
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


export const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        err: (state) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state: UserState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(loginUser.fulfilled, (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
        });
        builder.addCase(loginUser.rejected, (state: UserState) => {
            state.loader = false;
            state.error = true;
        });
        builder.addCase(authorizationUser.pending, (state: UserState) => {
            state.loader = true;
            state.error = false;
        });
        builder.addCase(authorizationUser.fulfilled, (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
        });
        builder.addCase(authorizationUser.rejected, (state: UserState) => {
            state.loader = false;
            state.error = true;
        });
    },
})


export const UserReducer = UserSlice.reducer;