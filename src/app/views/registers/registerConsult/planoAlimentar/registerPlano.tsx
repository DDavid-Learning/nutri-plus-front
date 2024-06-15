import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useConsultaContext } from '../../../../../core/context/AuthProvider/contextConsult/ConsultContext';
import { createConsult } from '../../../../../core/services/consults/consultsService';
import { TConsultRegister } from '../../../../../core/utils/types/types';

const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

interface Refeicao {
    refeicao: string;
    horario: string;
}

interface FormValues {
    dia: string;
    refeicoes: {
        [key: string]: Refeicao[];
    };
}

const RegisterPlanoAlimentar: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(diasSemana[0]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { consultaData } = useConsultaContext();

    const handleRegisterSubmit = async (values: FormValues) => {
        setIsLoading(true);
        try {
            const newConsultaData: TConsultRegister = {
                consulta: consultaData.consulta,
                planoAlimentar: consultaData.planoAlimentar,
                refeicoes: Object.entries(values.refeicoes).flatMap(([dia, refeicoes]) =>
                    refeicoes.map((refeicao: Refeicao) => ({
                        alimento: refeicao.refeicao,
                        dia_da_semana: dia,
                        horario: refeicao.horario,
                    }))
                ),
                medidas: consultaData.medidas,
            };
            console.log(newConsultaData);
            await createConsult(newConsultaData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Formik
                initialValues={{
                    dia: diasSemana[0],
                    refeicoes: diasSemana.reduce((acc, dia) => {
                        acc[dia] = Array(3).fill({ refeicao: '', horario: '' });
                        return acc;
                    }, {} as { [key: string]: Refeicao[] }),
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleRegisterSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form className="content-container-register">
                        <div className="title-plano-alimentar">Cadastro de Refeições</div>
                        <div className="input-container">
                            <div className="inputs-plano-alimentar">
                                <div className="form-group">
                                    <div className="form-floating mb-3">
                                        <Field as="select" name="dia" className="form-control" id="selectDia"
                                            value={selectedDay}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                const newDay = e.target.value;
                                                setSelectedDay(newDay);
                                            }}>
                                            {diasSemana.map((dia) => (
                                                <option key={dia} value={dia}>{dia}</option>
                                            ))}
                                        </Field>
                                        <label htmlFor="selectDia">Dia da Semana</label>
                                    </div>
                                </div>
                                <FieldArray name={`refeicoes.${selectedDay}`}>
                                    {() => (
                                        <>
                                            {values.refeicoes[selectedDay].map((refeicao, index) => (
                                                <div key={index} className="form-group">
                                                    <div className="form-floating mb-3">
                                                        <Field name={`refeicoes.${selectedDay}.${index}.refeicao`} type="text" className="form-control" id={`floatingRefeicao${index}`} placeholder="Refeição" />
                                                        <label htmlFor={`floatingRefeicao${index}`}>Refeição {index + 1}</label>
                                                        <ErrorMessage name={`refeicoes.${selectedDay}.${index}.refeicao`} component="div" className="text-danger" />
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <Field name={`refeicoes.${selectedDay}.${index}.horario`} type="text" className="form-control" id={`floatingHorario${index}`} placeholder="Horário da Refeição" />
                                                        <label htmlFor={`floatingHorario${index}`}>Horário {index + 1}</label>
                                                        <ErrorMessage name={`refeicoes.${selectedDay}.${index}.horario`} component="div" className="text-danger" />
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </FieldArray>
                            </div>
                        </div>
                        <div className="button">
                            <button type="submit" className="btn btn-secundary" disabled={isSubmitting}>
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
