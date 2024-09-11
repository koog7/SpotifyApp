import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Artists{
    _id: string;
    name: string;
    photo: string;
    info: string;
}


interface NewsState {
    allArtists: Artists[];
    loader: boolean;
    error: boolean;
}
const initialState: NewsState = {
    allArtists: [],
    loader: false,
    error: false,
};

export const ArtistsSlice = createSlice({
    name:'Artist',
    initialState,
    reducers:{
        deleteComment: (state, action: PayloadAction<string>) => {
            state.allComments = state.allComments.filter(comment => comment.id !== action.payload);
        },
    },
    extraReducers: (builder) => {},
})

export const ArtistsReducer = ArtistsSlice.reducer;
export const  {deleteComment}  = ArtistsSlice.actions;