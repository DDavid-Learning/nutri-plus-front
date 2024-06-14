import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { TConsultRegister } from "../../../utils/types/types";

export interface IConsultContext {
  consultaData: TConsultRegister;
  setConsultaData: React.Dispatch<React.SetStateAction<TConsultRegister>>;

}

export const ConsultContext = createContext<IConsultContext>(
  {} as IConsultContext
);

interface ConsultProviderProps {
  children: ReactNode;
}

export const ConsultProvider: FC<ConsultProviderProps> = ({ children }) => {

  const [consultaData, setConsultaData] = useState<TConsultRegister>({
    consulta: {
      ID_paciente: 0,
      ID_nutricionista: 0,
      data: '',
      tipo_pagamento: ''
    },
    planoAlimentar: {
      meta_calorica: 0,
      objetivo: ''
    },
    refeicoes: [],
    medidas: {
      biceps_esquerdo: 0,
      biceps_direito: 0,
      coxa_direito: 0,
      coxa_esquerda: 0,
      peitoral: 0,
      cintura: 0
    }
  });

  const contextValue = useMemo(
    () => ({
      consultaData,
      setConsultaData
    }),
    [consultaData]
  );

  return (
    <ConsultContext.Provider value={contextValue}>
      {children}
    </ConsultContext.Provider>
  )
};

export const useConsultaContext = (): IConsultContext => {
  const context = useContext(ConsultContext);
  if (!context) {
    throw new Error('useConsultaContext must be used within a ConsultaProvider');
  }
  return context;
};