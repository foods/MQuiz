import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContext, { AuthState } from './AuthenticationContext';
import useAuthTokenPersist from './useAuthTokenPersist';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../shared/state/auth/authReducer';
import { RootState } from '../../shared/state/appStore';
import { initialAuthState } from '../../shared/types/auth/authState';
import shallowCompare from '../../shared/util/shallowCompare';

type Props = {
    children: ReactNode;
};

const AuthenticationProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthState>(AuthState.unset);
    const { storedAuthToken, storeAuthToken, clearStoredToken } = useAuthTokenPersist();
    const auth = useSelector((state: RootState) => state.auth);
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
        [clearStoredToken, navigate],
    );

    const login = useCallback(
        (token: string, noNavigate: boolean = false) => {
            dispatch(setAuth(token));
            setAuthState(AuthState.authorized);
            if (!noNavigate) {
                navigate('/');
            }
        },
        [dispatch, navigate],
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
                login(storedAuthToken.token, true);
            }
        }
    }, [authState, login, storedAuthToken.token, storedAuthToken.tokenExpireTimestamp]);

    useEffect(() => {
        if (!shallowCompare(auth, initialAuthState)) {
            storeAuthToken(auth);
        }
    }, [auth, storeAuthToken]);

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
