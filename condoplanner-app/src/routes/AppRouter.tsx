import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../features/common/MainLayout";
import { ProtectedRoutes } from "./ProtectedRoutes";
import AuthLayout from "../features/auth/components/AuthLayout";
import LoginPage from "../features/auth/Login/LoginPage";
import { NotFoundPage } from "../features/common/NotFoundPage";
import CondominiumPage from "../features/condominium/CondominiumPage";
import { SettingsPage } from "../features/settings/SettingsPage";
import { RegisterPage } from "../features/auth/Register/RegisterPage";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<MainLayout />}>
                        {/* <Route index element={<HomePage />} /> */}
                        <Route path="condominios" element={<CondominiumPage />} />
                        {/* <Route path="reservation" element={<ReservationPage />} /> */}
                        <Route path="configuracoes" element={<SettingsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}