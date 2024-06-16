import React from 'react';
import './styles.css';
import { FaPerson } from "react-icons/fa6";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { useQuery } from '@tanstack/react-query';
import { fecthDashboard } from '../../../core/services/dashboard/dashboardService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashBoard: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    staleTime: Infinity,
    queryFn: fecthDashboard,
  });

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : (
        <div className="page-container">
          <div className="content-container">
            <div className='total-container'>
              <div className='upSide'>
                <h1 className='h1Secundary'>Total Consultas</h1>
                <div className='info'>
                  <BsFileEarmarkMedical size={32} color="#C2FF9C" style={{ marginBottom: '13px' }} />
                  <h1 className='h1Secundary'>{data.totalConsultas}</h1>
                </div>
              </div>
              <div className='downSide'>
                <button className='btn btn-primary' onClick={() => navigate('/registrarConsultas')}>Registrar consulta</button>
              </div>
            </div>
            <div className='total-container'>
              <div className='upSide'>
                <h1 className='h1Secundary'>Total Pacientes</h1>
                <div className='info'>
                  <FaPerson size={32} color="#C2FF9C" style={{ marginBottom: '14px' }} />
                  <h1 className='h1Secundary'>{data.totalPacientes}</h1>
                </div>
              </div>
              <div className='downSide'>
                <button className='btn btn-primary' onClick={() => navigate('/registrarPacientes')}>Registrar pacientes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
