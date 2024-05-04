import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContext, { AuthState } from './AuthenticationContext';
import useAuthTokenPersist from './useAuthTokenPersist';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from '../../shared/util/jwtDecode';
import { setAuth } from '../../shared/state/auth/authReducer';

type Props = {
    children: ReactNode;
};

const AuthenticationProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthState>(AuthState.unset);
    const { storedAuthToken, storeAuthToken, clearStoredToken } = useAuthTokenPersist();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = useCallback(
        (stopNavigation?: boolean) => {
            setAuthState(AuthState.unauthorized);
            clearStoredToken();
            if (!stopNavigation) {
                navigate('/');
            }
        },
        [navigate],
    );

    const login = useCallback(
        (token: string, noNavigate: boolean = false) => {
            dispatch(setAuth(token));

            setAuthState(AuthState.authorized);
            if (!noNavigate) {
                navigate('/');
            }
        },
        [navigate],
    );

    useEffect(() => {
        if (authState === AuthState.unset) {
            if (
                storedAuthToken.token === null ||
                storedAuthToken.tokenExpireTimestamp === null ||
                new Date() > new Date(storedAuthToken.tokenExpireTimestamp! * 1000)
            ) {
                setAuthState(AuthState.unauthorized);
            } else {
                login(storedAuthToken.token);
            }
        }
    }, [authState, storeAuthToken, login, jwtDecode]);

    const memoedValue = useMemo(
        () => ({
            authState,
            logout,
            login,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [authState],
    );

    return (
        <AuthenticationContext.Provider value={memoedValue}>
            {authState === AuthState.unset ? (
                <div className='spinner-wrapper'>
                    <div className='spinner'></div>
                </div>
            ) : (
                children
            )}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
