import { type RootState } from 'redux/store';

export const selectMenu = (state: RootState) =>
    state.storeReducers.menuPageSlice.menu;
