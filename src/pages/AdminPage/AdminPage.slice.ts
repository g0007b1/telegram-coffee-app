import { createSlice } from '@reduxjs/toolkit';

import { type MenuType } from 'pages/MenuPage/MenuPage.slice';
import { type AuthStateType, type TypeOrNull } from 'types/globalTypes';

export type CurrentCartType = Record<number, CartItemType>;

export type CartItemType = {
    name: string;
    price: number;
    volumeName: string;
    adminUserId: number;
    stamp: boolean;
    category: string;
};

type IndividualClientStat = Record<number, CartItemType>;

type HourType = Record<number, IndividualClientStat>;

export type TodayStatisticType = Record<number, HourType>;

type AdminPageType = {
    currentScanId: TypeOrNull<string>;
    currentUserInfo: TypeOrNull<AuthStateType>;
    menu: TypeOrNull<MenuType>;
    currentCart: TypeOrNull<CurrentCartType>;
    todayStatistic: TypeOrNull<TodayStatisticType>;
    currentFreeCoffee: TypeOrNull<number>;
};

const initialState: AdminPageType = {
    currentScanId: null,
    currentUserInfo: null,
    menu: null,
    currentCart: null,
    todayStatistic: null,
    currentFreeCoffee: null,
};

const adminPageSlice = createSlice({
    name: 'adminPage',
    initialState,
    reducers: {
        setCurrentScanId: (state, { payload }) => {
            state.currentScanId = payload;
        },
        setCurrentUserInfo: (state, { payload }) => {
            state.currentUserInfo = payload;
        },
        setMenuList: (state, { payload }) => {
            state.menu = payload;
        },
        setCurrentFreeCoffee: (state, { payload }) => {
            state.currentFreeCoffee = payload;
        },
        setTodayStatistic: (state, { payload }) => {
            console.log(payload);
            state.todayStatistic = payload;
        },
        pushToCart: (state, { payload }) => {
            if (!state.currentCart) state.currentCart = { ...payload };
            if (state.currentCart && Object.keys(state.currentCart).length < 5)
                state.currentCart = { ...state.currentCart, ...payload };
        },
        deleteFromCart: (state, { payload }) => {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            if (state.currentCart) delete state.currentCart[payload as number];
        },
        clearCart: (state) => {
            state.currentCart = null;
        },
    },
});

export default adminPageSlice.reducer;

export const {
    setCurrentScanId,
    setCurrentUserInfo,
    setMenuList,
    pushToCart,
    deleteFromCart,
    clearCart,
    setTodayStatistic,
    setCurrentFreeCoffee,
} = adminPageSlice.actions;
