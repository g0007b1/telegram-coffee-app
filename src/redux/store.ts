import {
    type Action,
    configureStore,
    type ThunkAction,
} from '@reduxjs/toolkit';

import { reducers } from './reducers';

export const store = configureStore({
    reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
