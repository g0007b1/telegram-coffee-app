import { type RootState } from 'redux/store';

export const selectAdminPage = (state: RootState) =>
    state.storeReducers.adminPageSlice;

export const selectCurrentScanId = (state: RootState) =>
    selectAdminPage(state).currentScanId;

export const selectCurrentUserInfo = (state: RootState) =>
    selectAdminPage(state).currentUserInfo;

export const selectMenuList = (state: RootState) => selectAdminPage(state).menu;

export const selectTodayStatistic = (state: RootState) =>
    selectAdminPage(state).todayStatistic;

export const selectCurrentCart = (state: RootState) =>
    selectAdminPage(state).currentCart;

export const selectCurrentFreeCoffee = (state: RootState) =>
    selectAdminPage(state).currentFreeCoffee;
