import { object, number, string } from 'yup'

// import { validationSchema as personValidationSchema } from './person'
import { idValidationType } from './commonTypes'

export const validationSchema = object().shape({
  id: idValidationType.notRequired(),
  // person: personValidationSchema,
  // articleId: string()
  //   .required('выберите основание платежа'),
  articleId: idValidationType
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required('выберите основание платежа')
    ),
  amount: number()
    .positive('зачение должно быть положительным')
    .required('введите сумму')
})

export const formikSchema = {
  articleId: '',
  amount: ''
}
