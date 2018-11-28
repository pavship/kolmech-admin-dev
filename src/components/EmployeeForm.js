import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { upsertEmployee } from '../graphql/employee';

import { Formik } from 'formik'
import { Form } from 'semantic-ui-react';
import { Button, A, Message } from './styled-semantic/styled-semantic';
import FormikField from './form/FormikField'

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

export default class EmployeeForm extends Component {
  render() {
    const {
      emp,
      orgId
    } = this.props
    return (
      <Mutation
        mutation={upsertEmployee}
        refetchQueries={['orgEmployees']}
      >
        {(upsertEmployee, { loading, error }) =>
          <Formik
            initialValues={{
              lName: '',
              fName: '',
              mName: '',
            }}
            onSubmit={async (values, { resetForm }) => {
              const {
                position,
                ...person
              } = values
              const input = {
                ...emp,
                orgId,
                ...person && { person }
              }
              console.log('input > ', input)
              const upserted = await upsertEmployee({ variables: { input } })
              console.log('upserted > ', upserted)
              resetForm()
            }}
            // onSubmit={(values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            //   }, 400);
            // }}
          >
            {({
              // isSubmitting,
              handleSubmit,
              handleReset
            }) =>
              <Form
                onSubmit={handleSubmit}
                error={!!error}
              >
                <FormikField
                  label='Фамилия'
                  name='lName'
                />
                <FormikField
                  label='Имя'
                  required
                  name='fName'
                />
                <FormikField
                  label='Отчество'
                  name='mName'
                />
                <Message
                  error
                  header='Не удалось добавить..'
                  content={error && error.message}
                />
                <Button
                  ml='122px'
                  type="submit"
                  primary
                  content='Добавить'
                  loading={loading}
                />
                <A cancel
                  onClick={handleReset}
                >
                  Очистить
                </A>
              </Form>
            }
          </Formik>
        }
      </Mutation>
    )
  }
}
