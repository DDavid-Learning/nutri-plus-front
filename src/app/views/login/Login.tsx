import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Validations } from '../../../core/utils/Validations';
import { useAuth } from '../../../core/context/AuthProvider/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.scss';
import { useState } from 'react';
import Notification from '../../components/Notification/notification';
import axios, { AxiosError } from 'axios';
import { error, log } from 'console';

interface ILogin {
  crn: string;
  senha: string;
}



const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLoginSubmit(values: { crn: string, senha: string }) {
    try {
      const resp = await auth.authenticate(values.crn, values.senha);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else {
        console.error("Ocorreu um erro inesperado");
      }
    }
    
  }

  const handleNotificationClose = () => {
    setErrorMessage(null);
  };

  const initialValues: ILogin = {
    crn: '',
    senha: '',
  };

  return (
    <div className='container-page-login'>
      {errorMessage && <Notification message={errorMessage} type="error" onClose={handleNotificationClose} />}
      <div className="container-login">

        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={Validations.SignupSchema}
          onSubmit={(values: ILogin, { setSubmitting }) => {
            handleLoginSubmit(values)
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <div className='form-container'>
              <div className='image'>
              </div>
              <Form>
                <div className='form-group'>
                  <h2 className="my-4">ACESSAR</h2>
                  <div className="form-label">
                    <label htmlFor="crn">CRN</label>
                    <Field name="crn" type="text" className="form-control" autoComplete="off" />
                    <ErrorMessage name="crn" component="div" className="text-danger" />
                  </div>

                  <div className="form-label">
                    <label htmlFor="senha">Senha</label>
                    <Field name="senha" type="password" className="form-control" autoComplete="off" />
                    <ErrorMessage name="senha" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Enviar
                  </button>

                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login