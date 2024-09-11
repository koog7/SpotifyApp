import {configureStore} from '@reduxjs/toolkit';
import {ArtistsReducer} from "../containers/Thunk/FetchSlice.ts";


export const store = configureStore({
    reducer: {
        Artist: ArtistsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;