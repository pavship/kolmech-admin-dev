import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep';

import { Mutation } from 'react-apollo';
import { upsertEmployee, orgEmployees } from '../../graphql/employee';

import { object, array, lazy, string } from 'yup'
import { Formik, FieldArray } from 'formik'
import { Dropdown } from 'semantic-ui-react';
import { Button, A, Message } from '../styled/styled-semantic';
import Field from '../form/Field';
import { projectEntity, preparePayload } from '../form/utils';

// position
// fName
// lName
// mName
// htmlNote
// tels { ...TelFragment }
// user {
//   email
//   confirmed
// }


const validationSchema = (emp) => object().shape({
  orgId: lazy(_ => emp ? string().notRequired() : string().matches(/^[a-z0-9]{25}$/).required()),
  person: object().shape({
    lName: lazy(value => !value ? string() : string().min(2).max(255)),
    fName: string().min(2).max(255).required(),
    mName: lazy(value => !value ? string() : string().min(2).max(255)),
    tels: array().of(object().shape({
      country: string().oneOf(['rus', 'notRus']),
      number: lazy(value => !value ? string() : string().min(7).max(25)),
    }))
  })
})

export default class EmployeeForm extends Component {
  didMount = false
  componentDidMount() { this.didMount = true }
  componentWillUnmount() { this.didMount = false }
  render() {
    const {
      emp,
      orgId,
      toggleEditMode,
      refetchQueries
    } = this.props
    let schema = {
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
    if (!emp) schema = {...schema, orgId}
    const initialValues = emp ? cloneDeep(projectEntity(emp, schema)) : schema
    return (
      <Mutation
        mutation={upsertEmployee}
        onCompleted={refetchQueries}
        // onError={refetchQueries}
        // onError={(err) => console.log('err > ', err)}
        // refetchQueries={[{
        //   query: orgEmployees,
        //   variables: {
        //     orgId
        //   }
        // }]}
      >
        {(upsertEmployee, { loading, error }) =>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(emp)}
            onSubmit={async (values, { resetForm }) => {
              console.log('initialValues > ', initialValues)
              const input = preparePayload(values, initialValues, schema)
              console.log('upsertEmployee input > ', input)
              const upserted = await upsertEmployee({ variables: { input } })
              console.log('upserted > ', upserted)
              return emp
                ? toggleEditMode()
                : this.didMount && resetForm()
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleReset,
              setFieldValue
            }) =>
              <>
                <Field
                  label='Фамилия'
                  name='person.lName'
                />
                <Field
                  label='Имя'
                  required
                  name='person.fName'
                />
                <Field
                  label='Отчество'
                  name='person.mName'
                />
                <Field
                  label='Телефон'
                  name='person.tels'
                />
                {!!error &&
                  <Message
                    error
                    header='Не удалось добавить..'
                    content={error && error.message}
                  />
                }
                <Button
                  ml='122px'
                  // type="submit"
                  type='button'
                  primary
                  content={emp ? 'Сохранить' : 'Добавить'}
                  loading={loading}
                  onClick={handleSubmit}
                />
                <A cancel
                  onClick={ emp ? toggleEditMode : handleReset}
                >
                  {emp ? 'Отмена' : 'Очистить'}
                </A>
              </>
            }
          </Formik>
        }
      </Mutation>
    )
  }
}
