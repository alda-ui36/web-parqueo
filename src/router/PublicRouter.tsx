import { JwtUtil } from "@/utils/jwt-utils";
import type React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


interface PublicRouterProps {
    children: React.ReactNode;
}

const PublicRouter: React.FC<PublicRouterProps> = ({ children }) => {
    useEffect(() =>{
        JwtUtil.clearTokens();
    },[])
    const token = JwtUtil.getAccessToken();
    const isAuthenticated = token ? JwtUtil.isTokenValid(token) : false;

    if(isAuthenticated){
        return <Navigate to="/" replace/>;
    }
    return <>{children}</>;

}

export default PublicRouter;