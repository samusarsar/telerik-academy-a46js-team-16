import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({
    user,
    redirectPath = '/log-in',
}) => {
    const location = useLocation();

    return user ?
        <Outlet /> :
        <Navigate to={redirectPath} state={{ from: location }} replace />;
};

export default ProtectedRoute;
