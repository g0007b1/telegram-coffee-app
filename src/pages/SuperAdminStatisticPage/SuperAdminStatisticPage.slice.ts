import { createSlice } from '@reduxjs/toolkit';

import { type TodayStatisticType } from 'pages/AdminPage/AdminPage.slice';
import { type TypeOrNull } from 'types/globalTypes';

export type SuperAdminStatisticPageType = {
    currentDayStatistic: TypeOrNull<TodayStatisticType>;
    currentMonthStatistic: TypeOrNull<Record<string, TodayStatisticType>>;

    currentHeader: TypeOrNull<string>;
    currentCountedStatistic: TypeOrNull<{
        countedItemsCategory: Record<string, Record<string, number>>;
        countedVolumesItems: Record<string, number>;
        countedItems: Record<string, number>;
        countedVolumes: Record<string, number>;
        countedVolumesCategory: Record<
            string,
            Record<string, Record<string, number>>
        >;
    }>;

    selectedMonth: TypeOrNull<number>;
    selectedYear: TypeOrNull<number>;
    monthMode: boolean;
};

const initialState: SuperAdminStatisticPageType = {
    currentDayStatistic: null,
    currentMonthStatistic: null,

    currentCountedStatistic: null,
    currentHeader: null,
    selectedMonth: null,
    selectedYear: null,
    monthMode: false,
};

const superAdminStatisticPageSlice = createSlice({
    name: 'superAdminStatisticPageSlice',
    initialState,
    reducers: {
        setCurrentDayStatistic: (state, { payload }) => {
            state.currentDayStatistic = payload;
        },
        setCurrentMonthStatistic: (state, { payload }) => {
            state.currentMonthStatistic = payload;
        },
        setCurrentCountedStatistic: (state, { payload }) => {
            state.currentCountedStatistic = payload;
        },
        setCurrentHeader: (state, { payload }) => {
            state.currentHeader = payload;
        },
        setSelectedMonth: (state, { payload }) => {
            state.selectedMonth = payload;
        },
        setSelectedYear: (state, { payload }) => {
            state.selectedYear = payload;
        },
        setMonthMode: (state, { payload }) => {
            state.monthMode = payload;
        },
    },
});

export default superAdminStatisticPageSlice.reducer;

export const {
    setCurrentDayStatistic,
    setCurrentCountedStatistic,
    setCurrentMonthStatistic,
    setCurrentHeader,
    setSelectedMonth,
    setSelectedYear,
    setMonthMode,
} = superAdminStatisticPageSlice.actions;
