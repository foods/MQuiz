import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Welcome from './shared/components/Welcome';
import AuthenticationProvider from './core/authentication/AuthenticationProvider';
import GameMaster from './gameMaster/GameMaster';
import RequireAuthentication from './core/authentication/RequireAuthentication';
import UserRole from './shared/types/user/userRole';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthenticationProvider>
                <Outlet />
            </AuthenticationProvider>
        ),
        children: [
            {
                index: true,
                element: <Welcome />,
            },
            {
                path: '/gamemaster',
                element: (
                    <RequireAuthentication role={UserRole.GameMaster}>
                        <GameMaster />
                    </RequireAuthentication>
                ),
            },
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
