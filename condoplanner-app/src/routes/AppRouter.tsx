import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../features/common/MainLayout";
import { ProtectedRoutes } from "./ProtectedRoutes";
import AuthLayout from "../features/auth/components/AuthLayout";
import LoginPage from "../features/auth/Login/LoginPage";
import { NotFoundPage } from "../features/common/NotFoundPage";
import CondominiumPage from "../features/condominium/CondominiumPage";
import { SettingsPage } from "../features/settings/SettingsPage";
import { RegisterPage } from "../features/auth/Register/RegisterPage";
import { InstanceLayout } from "../features/common/InstanceLayout";
import CommonAreasPage from "../features/instance/CommonAreas/CommonAreasPage";
import CommonAreaViewPage from "../features/instance/CommonAreas/CommonAreaViewPage";
import NotificationsPage from "../features/instance/NotificationsPage";
import { InstanceGuard } from "./InstanceGuard";
import CondominiumSettingsPage from "../features/instance/CondominiumSettings/CondominiumSettingsPage";
import AcceptInvitePage from "../features/invite/AcceptInvitePage";
import { useAuth } from "../hooks/useAuth";

export function AppRouter() {
    const { hasAuthenticationToken } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to={hasAuthenticationToken() ? "/condominios" : "/login"} replace />} />
                <Route element={<ProtectedRoutes />}>
                    <Route element={<MainLayout />}>
                        <Route path="condominios" element={<CondominiumPage />} />
                        <Route path="configuracoes" element={<SettingsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route path="c/:condominiumId" element={<InstanceGuard />}>
                        <Route element={<InstanceLayout />}>
                            <Route index element={<Navigate to="areas" replace />} />
                            <Route path="areas" element={<CommonAreasPage />} />
                            <Route path="areas/:areaId" element={<CommonAreaViewPage />} />
                            <Route path="comunicados" element={<NotificationsPage />} />
                            <Route path="configuracoes" element={<CondominiumSettingsPage />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="/accept-invite" element={<AcceptInvitePage />} />

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}