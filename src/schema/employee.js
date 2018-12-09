import { object, lazy, string } from 'yup'

import { validationSchema as personValidationSchema } from './person'

export const validationSchema = (emp) => object().shape({
  orgId: lazy(() => emp && emp.id
    ? string()
    : string().matches(/^[a-z0-9]{25}$/).required()
  ),
  person: personValidationSchema(emp && emp.person)
})

export const formikSchema = {
  person: {
    lName: '',
    fName: '',
    mName: '',
    tels: [{
      number: '',
      country: 'rus',
    }]
  }
}

export const listSchema = {
  person: {
    lName: {
      label: 'Фамилия'
    },
    fName: {
      label: 'Имя'
    },
    mName: {
      label: 'Отчество'
    },
    tels: [{
      label: 'Телефон',
      type: 'tel'
    }]
  }
}
