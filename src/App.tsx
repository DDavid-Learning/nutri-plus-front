
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthProvider/authContext';
import { ProtectedRoutes } from './core/ProtectedRoutes/ProtectedRoutes';
import DashBoard from './app/views/dashBoard/dashBoard';
import Login from './app/views/login/Login';
import Clients from './app/views/client/clients';
import './core/styles/content.sass'



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/clientes" element={<Clients />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
