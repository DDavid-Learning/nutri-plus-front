import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Validations } from '../../../core/utils/Validations';
import { useAuth } from '../../../core/context/AuthProvider/useAuth';
import { error } from 'console';


interface ILogin {
  crn: string;
  senha: string;
}



const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth()

  async function handleLoginSubmit (values: {crn: string, senha: string}) {

      await auth.authenticate(values.crn, values.senha).then((resp) =>{
        navigate("/clientes")
      }).catch((error) => {
        console.log(error)
      })

  }
  
  const initialValues: ILogin = {
    crn: '',
    senha: '',
  };

  return (
    <div className="container">
      <h2 className="my-4">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Validations.SignupSchema}
        onSubmit={(values: ILogin, { setSubmitting }) => {
          console.log(values);
          
          handleLoginSubmit(values)
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="crn">CRN</label>
              <Field name="crn" type="text" className="form-control" />
              <ErrorMessage name="crn" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <Field name="senha" type="senha" className="form-control" />
              <ErrorMessage name="senha" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login