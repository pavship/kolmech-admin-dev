import { object, number, string, date } from 'yup'

// import { validationSchema as personValidationSchema } from './person'
import { idValidationType } from './commonTypes'
import { toLocalISOString } from '../utils/dates';

export const validationSchema = object().shape({
  id: idValidationType.notRequired(),
  dateLocal: date('неверный формат даты')
    .required('введите дату и время в формате ГГГГ-ММ-ДДTЧЧ:ММ'),
    // TODO create proper isValidISODate function to check date
    // .transform(function(value, originalValue) {
    //   return isValidISODate(value) ? value : new Date('');
    // }),
  // person: personValidationSchema,
  articleId: idValidationType
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required('выберите основание платежа')
    ),
  personId: idValidationType
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required('выберите основание платежа')
    ),
  amount: number()
    .positive('зачение должно быть положительным')
    .required('введите сумму')
})

export const formikSchema = {
  dateLocal: toLocalISOString(new Date),
  articleId: '',
  personId: '',
  amount: ''
}
