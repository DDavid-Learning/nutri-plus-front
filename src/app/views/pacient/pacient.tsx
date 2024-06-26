
import { useQuery } from '@tanstack/react-query';
import { fecthPacient } from '../../../core/services/pacients/pacientsService';
import './styles.css';
import { formatCPF } from '../../../core/utils/globalFunctions';


const Clients = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["dashborad"],
    staleTime: Infinity,
    queryFn: () =>
      fecthPacient(),
  });

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>) : (
        <div className="page-container">
          <div className="content-container-table">
            <div className='title'>
              <h1 className='h1Secundary'>Pacientes Cadastrados</h1>
            </div>
            <div className='table'>
              <table className="table">
                <thead className="custom-thead head-table">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Idade</th>
                    <th scope="col">Numero de consultas</th>
                    <th scope="col">Data da ultima consulta</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((paciente: any) => (
                    <tr key={paciente.ID_paciente}>
                      <th scope="row">{paciente.ID_paciente}</th>
                      <td>{paciente.nome}</td>
                      <td>{formatCPF(paciente.cpf)}</td>
                      <td>{paciente.idade}</td>
                      <td>{paciente.numero_de_consultas}</td>
                      <td>{paciente.data_ultima_consulta || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Clients;
