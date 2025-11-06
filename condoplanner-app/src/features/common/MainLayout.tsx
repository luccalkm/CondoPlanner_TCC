import { Navigate, Outlet } from "react-router-dom";

export const MainLayout = () => {
    
    if (!!localStorage.getItem("token"))
        return <Navigate to={"/condominios"} replace />
        
    return (
        <div>
            <h1>Main Layout</h1>
            <Outlet />
        </div>
    );
}