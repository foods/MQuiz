import { useState } from 'react';
import AuthState, { initialAuthState } from '../../shared/types/auth/authState';

const storageName = 'userState';

const useAuthTokenPersist = () => {
    const [storedAuthToken, setTokenValue] = useState<AuthState>(() => {
        const item = localStorage.getItem(storageName);
        return item ? JSON.parse(item) : initialAuthState;
    });

    const storeAuthToken = (token: AuthState) => {
        setTokenValue(token);
        localStorage.setItem(storageName, JSON.stringify(token));
    };

    const clearStoredToken = () => {
        setTokenValue(initialAuthState);
    };

    return { storedAuthToken, storeAuthToken, clearStoredToken };
};

export default useAuthTokenPersist;
