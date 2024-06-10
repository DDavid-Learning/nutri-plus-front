
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthProvider/authContext';
import { ProtectedRoutes } from './core/ProtectedRoutes/ProtectedRoutes';
import Client from './app/views/client/Client';
import Login from './app/views/login/Login';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/clientes" element={<ProtectedRoutes><Client /></ProtectedRoutes>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
