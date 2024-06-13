import './styles.css'
import { FaPerson } from "react-icons/fa6";
import { BsFileEarmarkMedical } from "react-icons/bs";


const DashBoard = () => {

  return (
    <div className="page-container">
      <h1 className='h1Secundary'>teste</h1>
      <div className="content-container">
        <div className='total-container'>
          <div className='upSide'>
            <h1 className='h1Secundary'>Totoal consultas</h1>
            <div className='info'>
              <BsFileEarmarkMedical size={32} color="#C2FF9C" />
              <h1 className='h1Secundary'>teste</h1>
            </div>
          </div>
          <div className='downSide'>
            <button className='btn btn-primary'>Registrar consulta</button>
          </div>
        </div>
        <div className='total-container'>
          <div className='upSide'>
            <h1 className='h1Secundary'>Totoal pacientes</h1>
            <div className='info'>
              <FaPerson size={32} color="#C2FF9C" />
              <h1 className='h1Secundary'>teste</h1>
            </div>
          </div>
          <div className='downSide'>
            <button className='btn btn-primary'>Registrar pacientes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard