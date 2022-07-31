import * as yup from 'yup';

export const validationFileSchema = yup.object().shape({
    path: yup.string().required(),
    filename: yup.string().required(),
});
