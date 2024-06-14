export type TPacientRegister = {
  nome: string;
  cpf: string;
  email: string;
  altura: number;
  idade: number;
}



export type Consulta = {
  ID_paciente: number;
  ID_nutricionista: number;
  data: string;
  tipo_pagamento: string;
};

export type PlanoAlimentar = {
  meta_calorica: number;
  objetivo: string;
};

export type Refeicao = {
  alimento: string;
  dia_da_semana: string;
  horario: string;
};

export type Medidas = {
  biceps_esquerdo: number;
  biceps_direito: number;
  coxa_direito: number;
  coxa_esquerda: number;
  peitoral: number;
  cintura: number;
};

export type TConsultRegister = {
  consulta: Consulta;
  planoAlimentar: PlanoAlimentar | undefined;
  refeicoes: Refeicao[] | undefined;
  medidas: Medidas;
};

export type ConsultaDetalhes = {
  ID_consulta: number;
  ID_paciente: number;
  ID_nutricionista: number;
  data: string;
  tipo_pagamento: string;
  paciente: {
    nome: string;
    idade: number;
    cpf: string;
  };
  medidas: {
    biceps_esquerdo: number;
    biceps_direito: number;
    coxa_direito: number;
    coxa_esquerda: number;
    peitoral: number;
    cintura: number;
  };
  plano_alimentar: {
    ID_plano_alimentar: number;
    meta_calorica: number;
    objetivo: string;
    refeicoes: {
      ID_refeicao: number;
      alimento: string;
      dia_da_semana: string;
      horario: string;
    }[];
  };
};
