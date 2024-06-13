import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthProvider/useAuth'
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from '../../app/components/sideBar/sideBar';

export const ProtectedRoutes = () => {
    const auth = useAuth()

    useEffect(() => {
        console.log(auth.token)
    }, [auth.token])


    if (!auth.token) {
        return <Navigate to="/login" />;
    }
    return (
        <div className='app-container'>
            <SideBar />
            <Outlet />
        </div>

    );
}

