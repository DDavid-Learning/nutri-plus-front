import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fecthConsults, fecthConsultsDetails } from "../../../core/services/consults/consultsService";
import { FaDownload } from 'react-icons/fa';
import pdfMake from "pdfmake/build/pdfmake";
import htmlToPdfmake from "html-to-pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Consulta, ConsultaDetalhes } from "../../../core/utils/types/types";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Consults: React.FC = () => {
  const { data, isLoading } = useQuery<Consulta[]>({
    queryKey: ["dashboard"],
    staleTime: Infinity,
    queryFn: () => fecthConsults(),
  });

  const handleDownload = async (id: number) => {
    try {
      const consultDetails: ConsultaDetalhes = await fecthConsultsDetails(id.toString());
      const htmlContent = `
        <html>
          <head>
            <title>Consulta ${id}</title>
          </head>
          <body>
            <h1>Detalhes da Consulta</h1>
            <p>ID: ${consultDetails.ID_consulta}</p>
            <h2>Paciente</h2>
            <p>Nome: ${consultDetails.paciente.nome}</p>
            <p>Idade: ${consultDetails.paciente.idade}</p>
            <p>CPF: ${consultDetails.paciente.cpf}</p>
            <h2>Medidas</h2>
            <p>Bíceps Esquerdo: ${consultDetails.medidas.biceps_esquerdo}</p>
            <p>Bíceps Direito: ${consultDetails.medidas.biceps_direito}</p>
            <p>Coxa Direita: ${consultDetails.medidas.coxa_direito}</p>
            <p>Coxa Esquerda: ${consultDetails.medidas.coxa_esquerda}</p>
            <p>Peitoral: ${consultDetails.medidas.peitoral}</p>
            <p>Cintura: ${consultDetails.medidas.cintura}</p>
            <h2>Plano Alimentar</h2>
            <p>Meta Calórica: ${consultDetails.plano_alimentar.meta_calorica}</p>
            <p>Objetivo: ${consultDetails.plano_alimentar.objetivo}</p>
            <h3>Refeições</h3>
            ${consultDetails.plano_alimentar.refeicoes.map(refeicao => `
              <p>Alimento: ${refeicao.alimento}</p>
              <p>Dia da Semana: ${refeicao.dia_da_semana}</p>
              <p>Horário: ${refeicao.horario}</p>
            `).join('')}
          </body>
        </html>
      `;

      const pdfContent = htmlToPdfmake(htmlContent);
      const documentDefinition = { content: pdfContent };

      pdfMake.createPdf(documentDefinition).download(`consulta_${id}.pdf`);
    } catch (error) {
      console.error('Erro ao baixar consulta:', error);
    }
  };

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
          <div className="content-container-table">
            <div className="title">
              <h1 className="h1Secundary">Consultas Cadastradas</h1>
            </div>
            <div className="table">
              <table className="table">
                <thead className="custom-thead">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome Paciente</th>
                    <th scope="col">Nome Nutricionista</th>
                    <th scope="col">Data</th>
                    <th scope="col">Tipo Pagamento</th>
                    <th scope="col">Baixar Consulta</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((consulta: any) => (
                    <tr key={consulta.ID_consulta}>
                      <th scope="row">{consulta.ID_consulta}</th>
                      <td>{consulta.nome_paciente}</td>
                      <td>{consulta.nome_nutricionista}</td>
                      <td>{consulta.data}</td>
                      <td>{consulta.tipo_pagamento}</td>
                      <td>
                        <FaDownload
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleDownload(consulta.ID_consulta)}
                        />
                      </td>
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
};

export default Consults;
