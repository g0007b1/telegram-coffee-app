import { type RootState } from 'redux/store';

export const selectAuth = (state: RootState) => state.storeReducers.authSlice;

export const selectUserId = (state: RootState) => selectAuth(state).id;

export const selectUserCurrentAmountOfCups = (state: RootState) =>
    selectAuth(state).currentAmountOfCups;
