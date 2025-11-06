import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoutes = () => {
    const { hasAuthenticationToken } = useAuth();

    if (!hasAuthenticationToken()) {
        return <Navigate to={"/login"} replace />
    }

    return <Outlet />
}