import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthProvider/useAuth'
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth()

    useEffect(() => {
        console.log(auth.token)
    }, [auth.token])


    if (!auth.token) {
        return <Navigate to="/login" />;
    }
    return children;
}

