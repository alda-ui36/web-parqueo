import { Navigate, useLocation } from 'react-router-dom';
import { JwtUtil } from '@/utils/jwt.utils';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const token = JwtUtil.getAccessToken();
    const isAuthenticated = token ? JwtUtil.isTokenValid(token) : false;

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
