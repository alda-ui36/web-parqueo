import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { JwtUtil } from '@/utils/jwt.utils';

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    useEffect(() => {
        JwtUtil.clearTokens();
    }, []);

    const token = JwtUtil.getAccessToken();
    const isAuthenticated = token ? JwtUtil.isTokenValid(token) : false;

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
