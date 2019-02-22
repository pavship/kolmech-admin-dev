import React from 'react'

import { Mutation, Query } from 'react-apollo'
import { upsertPayment } from '../../graphql/payment'
import { syncWithAmoContacts } from '../../graphql/amo'

import { Formik } from 'formik'
import { projectEntity, preparePayload } from '../form/utils'
import { formikSchema, validationSchema } from '../../schema/payment'
import Field from '../form/Field'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import styled from 'styled-components'
import { Button, A, Div } from '../styled/styled-semantic'
import { persons } from '../../graphql/person';

const Container = styled.div`
  box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 2rem;
  font-size: 1.28571429rem;
  line-height: 1.28571429em;
  font-weight: bold;
  border-bottom: 1px solid rgba(34,36,38,.15);
`

const Fields = styled.div`
  .fz-formFieldLabel {
    ${({ labelWidth }) => labelWidth ? `flex-basis: ${labelWidth} !important;` : ''}
  }
`

export default ({
  payment,
  articles
}) => {
  let schema = formikSchema
  const initialValues = payment ? projectEntity(payment, schema) : schema
  const formLabelWidth = '100px'
  return (
    <NotificationsConsumer>
      {({ notify }) =>
        <Container>
          <Query
            query={persons}
            onError={err => notify({
              type: 'error',
              title: 'Ошибка загрузки контактов',
              content: err.message,
            })}
          >
            {({ loading: personsLoading, data , refetch }) => <>
              <Mutation
                mutation={syncWithAmoContacts}
                onError={err => notify({
                  type: 'error',
                  title: 'Ошибка синхронизации с Амо',
                  content: err.message,
                })}
              >
                {(syncWithAmoContacts, { loading }) => 
                  <Header>
                    Добавить платеж
                    <Button
                      ml='auto'
                      icon='sync alternate'
                      content='AmoCRM'
                      onClick={async () => {
                        const res = await syncWithAmoContacts()
                        console.log('res > ', res)
                      }}
                      loading={loading}
                    />
                  </Header>
                }
              </Mutation>
              <Div
                p='1rem 2rem'
              >
                <Mutation
                  mutation={upsertPayment}
                  onCompleted={() => notify({
                    type: 'success',
                    title: 'Платеж сохранен'
                  })}
                  onError={err => notify({
                    type: 'error',
                    title: 'Ошибка сохранения',
                    content: err.message,
                  })}
                >
                  {(upsertPayment, { loading }) =>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={async (values, { resetForm }) => {
                        // console.log('values > ', values)
                        // console.log('initialValues > ', initialValues)
                        const input = preparePayload(values, initialValues, schema)
                        // console.log('upsertPayment input > ', input)
                        await upsertPayment({ variables: { input } })
                        // const upserted = await upsertPayment({ variables: { input } })
                        // console.log('upserted > ', upserted)
                        return resetForm()
                      }}
                    >
                      {({
                        handleSubmit,
                        handleReset,
                      }) =>
                        <Fields
                          labelWidth={formLabelWidth}
                        >
                          <Field
                            label='Статья'
                            required
                            name='articleId'
                            options={articles}
                          />
                          <Field
                            label='Контрагент'
                            required
                            name='personId'
                            options={data.persons
                              ? data.persons.map(p => 
                                ({ key: p.id, text: p.amoName || p.fName, value: p.id })
                              )
                              : undefined
                            }
                            loading={personsLoading}
                            disabled={personsLoading}
                          />
                          <Field
                            label='Сумма'
                            required
                            name='amount'
                          />
                          <Button
                            ml={formLabelWidth}
                            type='button'
                            primary
                            content={payment ? 'Сохранить' : 'Добавить'}
                            loading={loading}
                            onClick={handleSubmit}
                          />
                          <A cancel
                            onClick={handleReset}
                          >
                            {payment ? 'Отмена' : 'Очистить'}
                          </A>
                        </Fields>
                      }
                    </Formik>
                  }
                </Mutation>
              </Div>
            </>}
          </Query>
        </Container>
      }
    </NotificationsConsumer>
  )
}

