import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    crn: Yup.string()
        .required('Crn é obrigatório'),
    senha: Yup.string()
        .required('Senha é obrigatório')
});

export const Validations = {
    SignupSchema
}
