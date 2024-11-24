import { createSlice } from '@reduxjs/toolkit';

import { type TypeOrNull } from 'types/globalTypes';

export type MenuItemType = {
    volumes: Record<string, number>;
    image: string;
    stamp: boolean;
};

export type CategoryItemsType = Record<string, MenuItemType>;

export type MenuType = Record<string, CategoryItemsType>;

export type MenuPageType = {
    menu: TypeOrNull<MenuType>;
};

const initialState: MenuPageType = { menu: null };

const menuPageSlice = createSlice({
    name: 'menuPageSlice',
    initialState,
    reducers: {
        setMenu: (state, { payload }) => {
            state.menu = payload;
        },
    },
});

export default menuPageSlice.reducer;
export const { setMenu } = menuPageSlice.actions;
