import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
});
