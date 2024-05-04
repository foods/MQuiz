import { Navigate, useLocation } from 'react-router-dom';
import useAuthentication from './useAuthentication';
import { AuthState } from './AuthenticationContext';
import UserRole from '../../shared/types/user/userRole';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/state/appStore';

type Props = {
    children: JSX.Element;
    role?: UserRole;
};

const RequireAuthentication = ({ children, role }: Props) => {
    const location = useLocation();
    const { authState } = useAuthentication();
    const { user } = useSelector((state: RootState) => state.auth);

    const hasCorrectRole = role === undefined || user?.role === role;

    return authState === AuthState.authorized && hasCorrectRole ? (
        children
    ) : (
        <Navigate
            to='/'
            state={{
                from: location,
            }}
            replace
        />
    );
};

export default RequireAuthentication;
