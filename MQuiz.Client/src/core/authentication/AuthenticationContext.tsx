import { createContext } from 'react';

export enum AuthState {
    unset,
    authorized,
    unauthorized,
}

export type AuthenticationStateType = {
    authState: AuthState;
    logout: (stopNavigation?: boolean) => void;
    login: (token: string, noNavigate?: boolean) => void;
};

const AuthenticationContext = createContext<AuthenticationStateType>({
    authState: AuthState.unset,
    logout: () => {},
    login: () => {},
});

export default AuthenticationContext;
