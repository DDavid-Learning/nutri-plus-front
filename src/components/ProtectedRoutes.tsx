import React from 'react'
import { useAuth } from '../context/AuthProvider/useAuth'
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {

    const auth = useAuth()
    if (!auth.login) {
        return <Navigate to="/login" />;
    }
    return children;
}

