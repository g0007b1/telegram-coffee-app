import { createSlice } from '@reduxjs/toolkit';

import { type TypeOrNull } from 'types/globalTypes';

type AdminType = {
    isAdmin: boolean;
    role: TypeOrNull<'admin' | 'barista' | 'super'>;
};

const initialState: AdminType = {
    isAdmin: false,
    role: null,
};

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setAdmin: (state, { payload }) => {
            state.isAdmin = true;
            state.role = payload.role;
        },
    },
});

export default adminSlice.reducer;

export const { setAdmin } = adminSlice.actions;
