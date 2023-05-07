import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({
    user,
}) => {
    const location = useLocation();

    if (location.pathname === '/log-in' || location.pathname === '/sign-up') {
        return user ?
            <Navigate to='my-profile' replace /> :
            <Outlet />;
    } else {
        return user ?
            <Outlet /> :
            <Navigate to='log-in' state={{ from: location }} replace />;
    };
};

export default ProtectedRoute;
