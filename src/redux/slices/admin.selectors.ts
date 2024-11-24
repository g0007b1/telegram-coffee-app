import { type RootState } from 'redux/store';

export const selectAdminData = (state: RootState) =>
    state.storeReducers.adminSlice;
