import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Validations } from '../../../core/utils/Validations';


interface ILogin {
  cpf: string;
  password: string;
}



const Login = () => {
  
  const initialValues: ILogin = {
    cpf: '',
    password: '',
  };

  return (
    <div className="container">
      <h2 className="my-4">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Validations.SignupSchema}
        onSubmit={(values: ILogin, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <Field name="cpf" type="text" className="form-control" />
              <ErrorMessage name="cpf" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
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