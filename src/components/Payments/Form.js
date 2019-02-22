import React from 'react'

import { Mutation } from 'react-apollo'
import { upsertPayment } from '../../graphql/payment'

import { Formik } from 'formik'
import { projectEntity, preparePayload } from '../form/utils'
import { formikSchema, validationSchema } from '../../schema/payment'
import Field from '../form/Field'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import styled from 'styled-components'
import { Button, A, Div } from '../styled/styled-semantic'

const articleOptions = [
  { key: 'LOAN', text: 'Займы', value: 'LOAN' },
  { key: 'SALARY', text: 'ЗП', value: 'SALARY' },
  { key: 'HH', text: 'Подбор персонала', value: 'HH' },
  { key: 'TRAINING', text: 'Обучение персонала', value: 'TRAINING' },
]

const Container = styled.div`
  box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
`

const Header = styled.div`
  padding: 1rem 2rem;
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
    <Container>
      <Header>
        <h3>Добавить платеж</h3>
      </Header>
      <Div
        p='1rem 2rem'
      >
        <NotificationsConsumer>
          {({ notify }) =>
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
              {(upsertPayment, { loading, error }) =>
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
          }
        </NotificationsConsumer>
      </Div>
    </Container>
  )
}

