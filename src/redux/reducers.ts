import { combineReducers } from '@reduxjs/toolkit';

import adminPageSlice from 'pages/AdminPage/AdminPage.slice';
import mainPageSlice from 'pages/MainPage/MainPage.slice';
import menuPageSlice from 'pages/MenuPage/MenuPage.slice';
import superAdminStatisticPageSlice from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.slice';
import superAdminUsersPageSlice from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.slice';

import adminSlice from './slices/admin.slice';
import authSlice from './slices/auth.slice';

export const storeReducers = combineReducers({
    mainPageSlice,
    authSlice,
    adminSlice,
    adminPageSlice,
    menuPageSlice,
    superAdminUsersPageSlice,
    superAdminStatisticPageSlice,
});

export const reducers = { storeReducers };
