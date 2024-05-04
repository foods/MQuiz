import User from '../user/user';

export const initialAuthState: AuthState = {
    token: null,
    tokenExpireTimestamp: null,
    isAuthenticated: false,
    user: null,
};

type AuthState = {
    token: string | null;
    tokenExpireTimestamp: number | null;
    isAuthenticated: boolean;
    user: User | null;
};

export default AuthState;
