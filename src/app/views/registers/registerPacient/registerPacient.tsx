import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import './styles.css';
import { createPacient } from '../../../../core/services/pacients/pacientsService';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Notification from '../../../components/Notification/notification';


const RegisterSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  altura: Yup.number().typeError('Altura deve ser um número').required('Altura é obrigatória'),
  idade: Yup.number().typeError('Idade deve ser um número').required('Idade é obrigatória'),
});

const RegisterPacient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNotificationClose = () => {
    setErrorMessage(null);
  };

  const initialValues = {
    nome: '',
    cpf: '',
    idade: '',
    altura: '',
    email: '',
  };

  const handleRegisterSubmit = async (values: any) => {
    const cleanedValues = {
      ...values,
      cpf: values.cpf.replace(/\D/g, ''),
    };
    try {
      const resp = await createPacient(cleanedValues);
      console.log(resp);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else {
        console.log("Ocorreu um erro inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          setIsLoading(true);
          handleRegisterSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="content-container-register">
            {errorMessage && <Notification message={errorMessage} type="error" onClose={handleNotificationClose} />}
            <div className="title">
              Informações do Paciente
            </div>
            <div className="info-container">
              <div className="infos">
                <div className="form-floating mb-3">
                  <Field name="nome" type="text" className="form-control" id="floatingNome" placeholder="Nome" />
                  <label htmlFor="floatingNome">Nome</label>
                  <ErrorMessage name="nome" component="div" className="text-danger" />
                </div>

                <div className="form-floating mb-3">
                  <Field name="cpf">
                    {({ field }: any) => (
                      <InputMask
                        {...field}
                        mask="999.999.999-99"
                        className="form-control"
                        id="floatingCPF"
                        placeholder="CPF"
                      />
                    )}
                  </Field>
                  <label htmlFor="floatingCPF">CPF</label>
                  <ErrorMessage name="cpf" component="div" className="text-danger" />
                </div>

                <div className="form-floating mb-3">
                  <Field name="email" type="email" className="form-control" id="floatingEmail" placeholder="Email" />
                  <label htmlFor="floatingEmail">Email</label>
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
              </div>

              <div className="infos">
                <div className="form-floating mb-3">
                  <Field name="altura" type="text" className="form-control" id="floatingAltura" placeholder="Altura" />
                  <label htmlFor="floatingAltura">Altura</label>
                  <ErrorMessage name="altura" component="div" className="text-danger" />
                </div>

                <div className="form-floating mb-3">
                  <Field name="idade" type="text" className="form-control" id="floatingIdade" placeholder="Idade" />
                  <label htmlFor="floatingIdade">Idade</label>
                  <ErrorMessage name="idade" component="div" className="text-danger" />
                </div>
              </div>
            </div>
            <div className="button">
              <button onClick={() => navigate(-1)} className="btn btn-secundary" disabled={isSubmitting || isLoading}>
                VOLTAR
              </button>
              <button type="submit" className="btn btn-secundary" disabled={isSubmitting || isLoading}>
                SALVAR
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPacient;
