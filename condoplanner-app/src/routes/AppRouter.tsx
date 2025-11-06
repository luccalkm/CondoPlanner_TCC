import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../features/common/MainLayout";
import { ProtectedRoutes } from "./ProtectedRoutes";
import AuthLayout from "../features/auth/components/AuthLayout";
import Login from "../features/auth/Login/Login";
import Register from "../features/auth/Register/Register";
import { NotFoundPage } from "../features/common/NotFoundPage";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<MainLayout />}>
                        {/* <Route index element={<HomePage />} /> */}
                        <Route path="condominium" element={<h1>Condomínio</h1>} />
                        {/* <Route path="reservation" element={<ReservationPage />} /> */}
                        {/* <Route path="commom-area" element={<CommomAreaPage />} /> */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}