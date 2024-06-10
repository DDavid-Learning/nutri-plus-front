import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    cpf: Yup.string()
        .required('cpf obrigatório'),
    password: Yup.string()
        .min(8, 'Senha muito curta, mínimo 8 caracteres')
        .required('Campo obrigatório')
});

export const Validations = {
    SignupSchema
}
