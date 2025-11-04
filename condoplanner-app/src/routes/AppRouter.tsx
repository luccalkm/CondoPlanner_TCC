import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../features/auth/Login/Login';
import Register from '../features/auth/Register/Register';
import AuthLayout from '../features/auth/components/AuthLayout';
import ProtectedRoute from './ProtectedRoute';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path="dashboard" element={<div>Dashboard</div>} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
