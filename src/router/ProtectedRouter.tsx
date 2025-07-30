import { JwtUtil } from "@/utils/jwt-utils";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouterProps {
    children: React.ReactNode;
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ children }) => {
    const location = useLocation()
    const token = JwtUtil.getAccessToken();
    const isAuthenticated = token ? JwtUtil.isTokenValid(token) : false;

    if(!isAuthenticated){
        return <Navigate to="/auth/login" replace state={{from: location}} />;
    }

    return <>{children}</>;
}

export default ProtectedRouter;