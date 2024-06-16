
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthProvider/authContext';
import { ProtectedRoutes } from './core/ProtectedRoutes/ProtectedRoutes';
import DashBoard from './app/views/dashBoard/dashBoard';
import Login from './app/views/login/Login';
import Clients from './app/views/pacient/pacient';
import './core/styles/content.sass'
import Consults from './app/views/consults/consults';
import RegisterConsult from './app/views/registers/registerConsult/registerConsult';
import RegisterPacient from './app/views/registers/registerPacient/registerPacient';
import RegisterPlanoAlimentar from './app/views/registers/registerConsult/planoAlimentar/registerPlano';



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/pacientes" element={<Clients />} />
            <Route path="/consultas" element={<Consults />} />
            <Route path="/registrarConsultas" element={<RegisterConsult />} />
            <Route path="/registrarPacientes" element={<RegisterPacient />} />
            <Route path="/registrarRefeicoes" element={<RegisterPlanoAlimentar />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
