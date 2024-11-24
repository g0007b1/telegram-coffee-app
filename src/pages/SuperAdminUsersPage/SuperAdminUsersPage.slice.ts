import { createSlice } from '@reduxjs/toolkit';

import { type AuthStateType, type TypeOrNull } from 'types/globalTypes';

export type AdminUserType = {
    role: 'admin' | 'barista' | 'super';
    first_name: string;
    last_name: string;
};

type AdminUsersType = Record<string, AdminUserType>;

type SuperAdminUsersPageType = {
    adminUsers: TypeOrNull<AdminUsersType>;
    currentScanUser: TypeOrNull<AuthStateType>;
    currentScanUserId: TypeOrNull<string>;
};

const initialState: SuperAdminUsersPageType = {
    adminUsers: null,
    currentScanUser: null,
    currentScanUserId: null,
};

const superAdminUsersPageSlice = createSlice({
    name: 'superAdminUsersPageSlice',
    initialState,
    reducers: {
        setAdminUsers: (state, { payload }) => {
            state.adminUsers = payload;
        },
        setCurrentScantUser: (state, { payload }) => {
            state.currentScanUser = payload;
        },
        setCurrentScanUserId: (state, { payload }) => {
            state.currentScanUserId = payload;
        },
    },
});

export default superAdminUsersPageSlice.reducer;

export const { setAdminUsers, setCurrentScantUser, setCurrentScanUserId } =
    superAdminUsersPageSlice.actions;
