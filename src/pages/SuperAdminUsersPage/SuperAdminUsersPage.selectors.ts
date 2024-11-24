import { type RootState } from 'redux/store';

export const selectSuperAdminUsersPageData = (state: RootState) =>
    state.storeReducers.superAdminUsersPageSlice;

export const selectSuperAdminUsersPageUsers = (state: RootState) =>
    selectSuperAdminUsersPageData(state).adminUsers;

export const selectCurrentScanUser = (state: RootState) =>
    selectSuperAdminUsersPageData(state).currentScanUser;

export const selectCurrentScanUserId = (state: RootState) =>
    selectSuperAdminUsersPageData(state).currentScanUserId;
