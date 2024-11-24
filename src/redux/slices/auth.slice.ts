import { createSlice } from '@reduxjs/toolkit';

import { type AuthStateType } from 'types/globalTypes';

const initialState: AuthStateType = {
    allows_write_to_pm: null,
    first_name: null,
    history: null,
    id: null,
    is_premium: null,
    language_code: null,
    last_name: null,
    username: null,
    currentAmountOfCups: null,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthData: (_, { payload }) => payload,
    },
});

export default authSlice.reducer;

export const { setAuthData } = authSlice.actions;
