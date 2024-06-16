import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fecthPacient } from '../../../../core/services/pacients/pacientsService';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useConsultaContext } from '../../../../core/context/AuthProvider/contextConsult/ConsultContext';


const RegisterConsult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const navigate = useNavigate();
  const { consultaData, setConsultaData } = useConsultaContext();

  const { data, isFetching } = useQuery({
    queryKey: ["pacient"],
    staleTime: Infinity,
    queryFn: () => fecthPacient(),
  });

  useEffect(() => {
    if (data) {
      setPatients(data);
    }
  }, [data]);


  const handleRegisterSubmit = async (values: any) => {
    const selectedPatient = patients.find((p: any) => p.nome === values.nome);
    const pacientData = {
      ...values,
      ID_paciente: selectedPatient?.ID_paciente || values.ID_paciente,
    };
    setConsultaData({
      consulta: {
        ID_paciente: selectedPatient?.ID_paciente ?? 0,
        ID_nutricionista: 4,
        data: values.data,
        tipo_pagamento: values.tipo_pagamento,
      },
      planoAlimentar: {
        meta_calorica: parseInt(values.meta_calorica),
        objetivo: values.objetivo,
      },
      refeicoes: consultaData.refeicoes,
      medidas: {
        biceps_esquerdo: parseFloat(values.biceps_esquerdo),
        biceps_direito: parseFloat(values.biceps_direito),
        coxa_direito: parseFloat(values.coxa_direito),
        coxa_esquerda: parseFloat(values.coxa_esquerda),
        peitoral: parseFloat(values.peitoral),
        cintura: parseFloat(values.cintura),
      },
    });
    navigate('/registrarRefeicoes')
  };

  if (isFetching) {
    return  (<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>);
  }

  return (
    <div className="page-container">
      <Formik
        initialValues={{
          nome: '',
          ID_paciente: '',
          data: '',
          meta_calorica: '',
          objetivo: '',
          tipo_pagamento: '',
          biceps_esquerdo: '',
          biceps_direito: '',
          coxa_direito: '',
          coxa_esquerda: '',
          peitoral: '',
          cintura: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          handleRegisterSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="content-container-register">
            <div className='titles'>
              <div className="title">
                Informações Gerais
              </div>
              <div className="title">
                Informações de Medidas
              </div>
            </div>
            <div className="input-container">
              <div className="inputs">
                <div className="form-floating mb-3">
                  <Field as="select" name="nome" className="form-control large-select" id="floatingNome" placeholder="Nome">
                    <option value="" label="Selecione um paciente" />
                    {patients.map((patient: any) => (
                      <option key={patient.ID_paciente} value={patient.nome} label={patient.nome} />
                    ))}
                  </Field>
                  <label htmlFor="floatingNome">Nome do Paciente</label>
                  <ErrorMessage name="nome" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="data" type="text" className="form-control" id="floatingData" placeholder="Data" />
                  <label htmlFor="floatingData">Data</label>
                  <ErrorMessage name="data" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="tipo_pagamento" type="text" className="form-control" id="floatingTipoPagamento" placeholder="Tipo de Pagamento" />
                  <label htmlFor="floatingTipoPagamento">Tipo de Pagamento</label>
                  <ErrorMessage name="tipo_pagamento" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="meta_calorica" type="text" className="form-control" id="floatingMetaCalorica" placeholder="Meta Calórica" />
                  <label htmlFor="floatingMetaCalorica">Meta Calórica</label>
                  <ErrorMessage name="meta_calorica" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="objetivo" type="text" className="form-control" id="floatingObjetivo" placeholder="Objetivo" />
                  <label htmlFor="floatingObjetivo">Objetivo</label>
                  <ErrorMessage name="objetivo" component="div" className="text-danger" />
                </div>
              </div>
              <div className="inputs">
                <div className="form-floating mb-3">
                  <Field name="biceps_esquerdo" type="text" className="form-control" id="floatingBicepsEsquerdo" placeholder="Bíceps Esquerdo" />
                  <label htmlFor="floatingBicepsEsquerdo">Bíceps Esquerdo</label>
                  <ErrorMessage name="biceps_esquerdo" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="biceps_direito" type="text" className="form-control" id="floatingBicepsDireito" placeholder="Bíceps Direito" />
                  <label htmlFor="floatingBicepsDireito">Bíceps Direito</label>
                  <ErrorMessage name="biceps_direito" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="coxa_direito" type="text" className="form-control" id="floatingCoxaDireito" placeholder="Coxa Direito" />
                  <label htmlFor="floatingCoxaDireito">Coxa Direito</label>
                  <ErrorMessage name="coxa_direito" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="coxa_esquerda" type="text" className="form-control" id="floatingCoxaEsquerda" placeholder="Coxa Esquerda" />
                  <label htmlFor="floatingCoxaEsquerda">Coxa Esquerda</label>
                  <ErrorMessage name="coxa_esquerda" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="peitoral" type="text" className="form-control" id="floatingPeitoral" placeholder="Peitoral" />
                  <label htmlFor="floatingPeitoral">Peitoral</label>
                  <ErrorMessage name="peitoral" component="div" className="text-danger" />
                </div>
                <div className="form-floating mb-3">
                  <Field name="cintura" type="text" className="form-control" id="floatingCintura" placeholder="Cintura" />
                  <label htmlFor="floatingCintura">Cintura</label>
                  <ErrorMessage name="cintura" component="div" className="text-danger" />
                </div>
              </div>
            </div>
            <div className="button-consult">
              <button onClick={() => navigate('/dashboard')} className="btn btn-secundary" disabled={isSubmitting || isLoading}>
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

export default RegisterConsult;
