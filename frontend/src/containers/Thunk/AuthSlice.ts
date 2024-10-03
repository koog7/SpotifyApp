import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axios/AxiosAPI.ts";
import {isAxiosError} from "axios";

export interface User{
    _id: string,
    username: string,
    photo?:File,
    displayName?:string,
    token: string,
}
interface LoginData {
    username: string;
    password: string;
    displayName: string;
    photo: File;
}

interface UserState {
    user: User | null;
    loader: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loader: false,
    error: null,
};
export const loginUser = createAsyncThunk<User , LoginData , { rejectValue: string }>('users/singIn', async (loginData: { username: string; password: string ,displayName: string, photo: File } , { rejectWithValue }) => {
    try{
        const newFormData = new FormData()
        newFormData.append('username',loginData.username)
        newFormData.append('password',loginData.password)
        newFormData.append('displayName',loginData.displayName)
        newFormData.append('avatar',loginData.photo)

        const response = await axiosAPI.post(`/users` , newFormData);
        return response.data;
    }catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});

export const authorizationUser = createAsyncThunk<User , LoginData , { rejectValue: string }>('users/singUp', async (loginData: { username: string; password: string }, { rejectWithValue }) => {
    try{
        const response = await axiosAPI.post(`/users/sessions` , loginData);
        return response.data;
    }catch (error) {
        console.error('Error details:', error.response);
        return rejectWithValue(error.response?.data?.message || 'Username or password wrong');
    }
});

export const googleLogin = createAsyncThunk<User, string, {rejectValue}>('users/googleLogin', async (credential, { rejectWithValue }) => {
    try {
        const response = await axiosApi.post('/users/google', { credential });
        console.log(response.data.user)
        return response.data.user;
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
    },
);

export const logout = createAsyncThunk<void, string, {state: RootState}>('users/logout',
    async () => {
        await axiosAPI.delete('/users/sessions');
    }
);
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
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(authorizationUser.pending, (state: UserState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(authorizationUser.fulfilled, (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(authorizationUser.rejected, (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(logout.pending, (state: UserState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(logout.fulfilled, (state: UserState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(logout.rejected, (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(googleLogin.pending, (state: UserState) => {
            state.loader = true;
        });
        builder.addCase(googleLogin.fulfilled, (state: UserState, { payload: user }) => {
            state.loader = false;
            state.user = user;
        });
        builder.addCase(googleLogin.rejected, (state: UserState, { payload: error }) => {
            state.loader = false;
            state.error = error || null;

        });
    },
})


export const UserReducer = UserSlice.reducer;