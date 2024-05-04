import AuthState, { initialAuthState } from '../../shared/types/auth/authState';
import useLocalStorage from '../../shared/util/useLocalStorage';

const storageName = 'userState';

const useAuthTokenPersist = () => {
    const [storedAuthToken, setTokenValue] = useLocalStorage<AuthState>(
        storageName,
        initialAuthState,
    );

    const storeAuthToken = (token: AuthState) => {
        setTokenValue(token);
    };

    const clearStoredToken = () => {
        setTokenValue(initialAuthState);
    };

    return { storedAuthToken, storeAuthToken, clearStoredToken };
};

export default useAuthTokenPersist;
