import { type RootState } from 'redux/store';

export const selectCurrentDayStatistic = (state: RootState) =>
    state.storeReducers.superAdminStatisticPageSlice.currentDayStatistic;

export const selectCurrentMonthStatistic = (state: RootState) =>
    state.storeReducers.superAdminStatisticPageSlice.currentMonthStatistic;

export const selectCurrentCountedStatistic = (state: RootState) =>
    state.storeReducers.superAdminStatisticPageSlice.currentCountedStatistic;

export const selectCurrentHeader = (state: RootState) =>
    state.storeReducers.superAdminStatisticPageSlice.currentHeader;

export const selectSelectedMonth = (state: RootState) =>
    state.storeReducers.superAdminStatisticPageSlice.selectedMonth;

export const selectSelectedYear = (state: RootState) =>
    state.storeReducers.superAdminStatisticPageSlice.selectedYear;

export const selectMonthMode = (state: RootState) =>
    state.storeReducers.superAdminStatisticPageSlice.monthMode;
