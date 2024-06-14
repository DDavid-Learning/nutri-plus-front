import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthProvider/useAuth'
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from '../../app/components/sideBar/sideBar';
import DefaultDialog from '../../app/components/dialog/defaultDialog';

export const ProtectedRoutes = () => {
    const auth = useAuth()
    const { isLogoutDialogOpen, closeLogoutDialog, logout } = useAuth();
    useEffect(() => {
        console.log(auth.token)
    }, [auth.token])

    const handleLogout = () => {
        <Navigate to="/login" />
        logout();
        closeLogoutDialog();
    };

    if (!auth.token) {
        return <Navigate to="/login" />;
    }
    return (<>
        <DefaultDialog
            isOpen={isLogoutDialogOpen}
            title="Deseja realmente sair?"
            onCloseAction={closeLogoutDialog}
            confirmAction={handleLogout}
        />
        <div className='app-container'>
            <SideBar />
            <Outlet />
        </div>
    </>
    );
}

