// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import type { JSX } from 'react';

import Login from '../features/auth/Login/Login';
import Register from '../features/auth/Register/Register';
import AuthLayout from '../features/auth/components/AuthLayout';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route
                    path="/dashboard"
                    element={<ProtectedRoute><div>Dashboard</div></ProtectedRoute>}
                />
            </Routes>
        </BrowserRouter>
    );
}
