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
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              h1, h2, h3 {
                color: #333;
              }
              .header, .footer {
                text-align: center;
                margin-bottom: 20px;
              }
              .section {
                margin-bottom: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              table, th, td {
                border: 1px solid #000;
              }
              th, td {
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>NUTRI PLUS</h1>
              <p>Saúde e bem estar</p>
            </div>
            <div class="section">
              <h3>Nome do paciente: ${consultDetails.paciente.nome}</h2>
              <h3>Data: ${consultDetails.data}</h2>
            </div>
            <div class="section">
              <h2>Medidas da consulta:</h2>
              <table>
                <tr>
                  <th>Bíceps Esquerdo</th>
                  <th>Bíceps Direito</th>
                  <th>Coxa Esquerda</th>
                  <th>Coxa Direita</th>
                  <th>Cintura</th>
                  <th>Peitoral</th>
                </tr>
                <tr>
                  <td>${consultDetails.medidas.biceps_esquerdo} cm</td>
                  <td>${consultDetails.medidas.biceps_direito} cm</td>
                  <td>${consultDetails.medidas.coxa_esquerda} cm</td>
                  <td>${consultDetails.medidas.coxa_direito} cm</td>
                  <td>${consultDetails.medidas.cintura} cm</td>
                  <td>${consultDetails.medidas.peitoral} cm</td>
                </tr>
              </table>
            </div>
            <div class="section">
              <h2>Refeições:</h2>
              <table>
                <tr>
                  <th>Dia/Horário</th>
                  <th>9:00</th>
                  <th>12:00</th>
                  <th>19:00</th>
                </tr>
                ${["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map(dia => `
                  <tr>
                    <th>${dia}</th>
                    <td>${consultDetails.plano_alimentar.refeicoes.find(r => r.dia_da_semana === dia && r.horario === "9:00")?.alimento || ""}</td>
                    <td>${consultDetails.plano_alimentar.refeicoes.find(r => r.dia_da_semana === dia && r.horario === "12:00")?.alimento || ""}</td>
                    <td>${consultDetails.plano_alimentar.refeicoes.find(r => r.dia_da_semana === dia && r.horario === "19:00")?.alimento || ""}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
            <div class="footer">
              <p>Saúde e bem estar/p>
            </div>
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
