import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { initialAuthState } from '../../types/auth/authState';
import jwtDecode from '../../util/jwtDecode';
import User from '../../types/user/user';
import UserRole from '../../types/user/userRole';

type ClaimsUser = {
    sub: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
};

const mapClaimsUserToUser = (claimsUser: ClaimsUser): User => ({
    id: claimsUser.sub,
    role: claimsUser[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ] as unknown as UserRole,
    name: claimsUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setAuth: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            const { objContent, tokenExpireTimestamp } = jwtDecode(action.payload);
            state.user = mapClaimsUserToUser(objContent);
            state.tokenExpireTimestamp = tokenExpireTimestamp;
        },
        clearAuth: (state) => {
            state = initialAuthState;
        },
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
