import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useConsultaContext } from '../../../../../core/context/AuthProvider/contextConsult/ConsultContext';
import { createConsult } from '../../../../../core/services/consults/consultsService';
import { TConsultRegister } from '../../../../../core/utils/types/types'; // Importe os tipos necessários

const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

const RegisterPlanoAlimentar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { consultaData, setConsultaData } = useConsultaContext();

    const handleRegisterSubmit = async (values: any) => {
        setIsLoading(true);

        try {
            // Construindo o objeto newConsultaData com os tipos corretos
            const newConsultaData: TConsultRegister = {
                consulta: consultaData.consulta,
                planoAlimentar: {
                    meta_calorica: parseInt(values.meta_calorica),
                    objetivo: values.objetivo,
                },
                refeicoes: values.refeicoes.map((refeicao: any) => ({
                    alimento: refeicao.refeicao,
                    dia_da_semana: refeicao.dia,
                    horario: refeicao.horario,
                })),
                medidas: consultaData.medidas,
            };

            console.log(newConsultaData);

            await createConsult(newConsultaData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            setIsLoading(false);
            // Tratamento de erro aqui
        }
    };

    return (
        <div className="page-container">
            <Formik
                initialValues={{
                    meta_calorica: '', 
                    objetivo: '', 
                    refeicoes: diasSemana.map((dia) => ({ dia, refeicao: '', horario: '' })),
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleRegisterSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting }) => (
                    <Form className="content-container-register">
                        <div className="title">Cadastro de Plano Alimentar</div>
                        <div className="input-container">
                            <div className="infos">
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
                            <div className="infos-row">
                                <FieldArray name="refeicoes">
                                    {({ push, remove }) => (
                                        <>
                                            {values.refeicoes.map((refeicao, index) => (
                                                <div key={index} className="form-group">
                                                    <div className="form-floating mb-3">
                                                        <Field name={`refeicoes.${index}.dia`} type="text" className="form-control" id={`floatingDia${index}`} readOnly />
                                                        <label htmlFor={`floatingDia${index}`}>{refeicao.dia}</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <Field name={`refeicoes.${index}.refeicao`} type="text" className="form-control" id={`floatingRefeicao${index}`} placeholder="Refeição" />
                                                        <label htmlFor={`floatingRefeicao${index}`}>Refeição</label>
                                                        <ErrorMessage name={`refeicoes.${index}.refeicao`} component="div" className="text-danger" />
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <Field name={`refeicoes.${index}.horario`} type="text" className="form-control" id={`floatingHorario${index}`} placeholder="Horário da Refeição" />
                                                        <label htmlFor={`floatingHorario${index}`}>Horário da Refeição</label>
                                                        <ErrorMessage name={`refeicoes.${index}.horario`} component="div" className="text-danger" />
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </FieldArray>
                            </div>
                        </div>
                        <div className="button">
                            <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
                                SALVAR
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterPlanoAlimentar;
