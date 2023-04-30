import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({
    isLoggedIn,
    redirectPath = '/log-in',
}) => {
    const location = useLocation();

    return isLoggedIn ?
        <Outlet /> :
        <Navigate to={redirectPath} state={{ from: location }} replace />;
};

export default ProtectedRoute;
