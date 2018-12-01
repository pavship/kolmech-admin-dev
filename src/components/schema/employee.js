export const empSchema = {
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