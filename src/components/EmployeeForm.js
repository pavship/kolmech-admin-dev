import React, { Component } from 'react'
import { updatedDiff } from 'deep-object-diff';
import { flatten, unflatten } from 'flat'
import { Mutation } from 'react-apollo';
import { upsertEmployee, orgEmployees } from '../graphql/employee';

import { Formik, getIn, FieldArray } from 'formik'
import { Form, Dropdown } from 'semantic-ui-react';
// import {  } from 'formik-semantic-ui'
import { Button, A, Message } from './styled-semantic/styled-semantic';
import FormikField from './form/FormikField'
import FormikTelField from './form/FormikTelField';

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
    let initialValues = {
      person: {
        id: '',
        lName: '',
        fName: '',
        mName: '',
        tels: [{
          number: '',
          country: 'rus',
        }]
      }
    }
    const flatIni = flatten(initialValues)
    const flatEmp = emp && flatten(emp)
    // not-empty-initial-values are then added to payload (for new entities)
    const flatIniNotEmpty = {}
    Object.keys(flatIni).forEach(k => {
      if (flatIni[k]) flatIniNotEmpty[k] = flatIni[k]
      // initial blank values substituted by existing entity
      if (emp && flatEmp[k]) flatIni[k] = flatEmp[k]
    })
    if (emp) initialValues = unflatten(flatIni)
    console.log('flatIniNotEmpty > ', flatIniNotEmpty)
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
            onSubmit={async (values, { resetForm }) => {
              let updatedValues = updatedDiff(initialValues, values)
              // not-empty-initial-values are added to payload (for new entities)
              if (!emp) {
                const flatUpd = flatten(updatedValues)
                Object.keys(flatIniNotEmpty).forEach(k => {
                  if (!flatUpd[k]) flatUpd[k] = flatIniNotEmpty[k]
                })
                updatedValues = unflatten(flatUpd)
              }
              const input = {
                ...emp && { id: emp.id },
                ...!emp && { orgId },
                ...updatedValues
              }
              console.log('input > ', input)
              const upserted = await upsertEmployee({ variables: { input } })
              console.log('upserted > ', upserted)
              if (emp) toggleEditMode()
              resetForm()
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
                    // <div>
                    //   {values.friends.map((friend, index) => (
                    //     <div key={index}>
                    //       <Field name={`friends[${index}]name`} />
                    //       <Field name={`friends.${index}.age`} /> // both these conventions do
                    //       the same
                    //       <button type="button" onClick={() => arrayHelpers.remove(index)}>
                    //         -
                    //       </button>
                    //     </div>
                    //   ))}
                    //   <button
                    //     type="button"
                    //     onClick={() => arrayHelpers.push({ name: '', age: '' })}
                    //   >
                    //     +
                    //   </button>
                    // </div>
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
