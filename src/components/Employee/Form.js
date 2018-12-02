import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep';
import { Mutation } from 'react-apollo';
import { upsertEmployee, orgEmployees } from '../../graphql/employee';

import { Formik, getIn, FieldArray } from 'formik'
import { Form, Dropdown } from 'semantic-ui-react';
import { Button, A, Message } from '../styled/styled-semantic';
import FormikField from '../form/FormikField'
import FormikTelField from '../form/FormikTelField';
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

const countryOtions = [
  { key: 'rus', text: '+7', value: 'rus' },
  { key: 'notRus', text: 'прочие', value: 'notRus' },
]

export default class EmployeeForm extends Component {
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
    const initialValues = emp ? cloneDeep(projectEntity(emp, schema)) : schema
    console.log('initialValues > ', initialValues)
    return (
      <Mutation
        mutation={upsertEmployee}
        onCompleted={refetchQueries}
        onError={refetchQueries}
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
            onSubmit={(values, { resetForm }) => {
              console.log('values > ', values)

              const input = preparePayload(values, initialValues, schema)
              console.log('input > ', input)

              // const upserted = await upsertEmployee({ variables: { input } })
              // console.log('upserted > ', upserted)
              // if (emp) toggleEditMode()
              // resetForm()
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleReset,
              setFieldValue
            }) =>
              <Form
                onSubmit={handleSubmit}
                error={!!error}
              >
                <FormikField
                  label='Фамилия'
                  name='person.lName'
                />
                <FormikField
                  label='Имя'
                  required
                  name='person.fName'
                />
                <FormikField
                  label='Отчество'
                  name='person.mName'
                />
                <FieldArray
                  name='person.tels'
                  render={arrayHelpers => (
                    <>
                      {values.person.tels.map((tel, i) => (
                        <FormikTelField
                          key={i}
                          name={`person.tels.${i}.number`}
                          inputLabel={
                            <Dropdown
                              tabIndex={-1}
                              name={`person.tels.${i}.country`}
                              value={values.person.tels[i].country}
                              options={countryOtions}
                              onChange={(e, { name, value }) => setFieldValue( name, value )}
                            />
                          }
                          country={values.person.tels[i].country}
                        />
                      ))}
                    </>
                  )}
                  />
                {/* <FormikTelField
                  name='person.tels[0].number'
                  inputLabel={
                    <Dropdown
                      tabIndex={-1}
                      name='person.tels[0].country'
                      // value={values['person.country']}
                      value={getIn(values, 'person.tels[0].country')}
                      // defaultValue={country.curVal}
                      options={countryOtions}
                      // onChange={handleChange}
                      onChange={(e, { name, value }) => setFieldValue( name, value )}
                      // onChange={(e, { name, value }) => setField('country', { value })}
                    />
                  }
                  country={getIn(values, 'person.tels[0].country')}
                /> */}
                <Message
                  error
                  header='Не удалось добавить..'
                  content={error && error.message}
                />
                <Button
                  ml='122px'
                  type="submit"
                  primary
                  content={emp ? 'Сохранить' : 'Добавить'}
                  loading={loading}
                />
                <A cancel
                  onClick={ emp ? toggleEditMode : handleReset}
                >
                  {emp ? 'Отмена' : 'Очистить'}
                </A>
              </Form>
            }
          </Formik>
        }
      </Mutation>
    )
  }
}
