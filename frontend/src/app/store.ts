import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {ArtistsReducer} from "../containers/Thunk/FetchSlice.ts";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {TrackHistoryReducer} from "../containers/Thunk/TrackHistorySlice.ts";
import {UserReducer} from "../containers/Thunk/AuthSlice.ts";
import {FormReducer} from "../containers/Thunk/PostSlice/DataSlice.ts";


const usersPersistConfig = {
    key: 'liteSpotify:Artist',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    User: persistReducer(usersPersistConfig, UserReducer),
    TrackHistory: TrackHistoryReducer,
    Artist: ArtistsReducer,
    PostData: FormReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;