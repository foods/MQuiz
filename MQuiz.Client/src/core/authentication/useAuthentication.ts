import { useContext } from 'react';
import AuthenticationContext from './AuthenticationContext';

const useAuthentication = () => {
    const authContext = useContext(AuthenticationContext);
    if (!authContext) {
        console.error('useAuthentication needs to be inside of the <AuthenticationWrapper>');
    }
    return authContext;
};

export default useAuthentication;
