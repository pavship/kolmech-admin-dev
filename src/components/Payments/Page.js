import React from 'react'

import { Query, Mutation } from 'react-apollo'
import { paymentsPage } from '../../graphql/payment'

import styled from 'styled-components'
import PaymentForm from './Form'
import PaymentStats from './Stats'
import PaymentTable from './Table'
import { syncWithTochkaPayments } from '../../graphql/tochka';
import { NotificationsConsumer } from '../notifications/NotificationsContext';
import { Button } from '../styled/styled-semantic';

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

const Container = styled.div`
  height: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const TopSection = styled.div`
  flex: 1 0 content;
  min-height: ${308 + 47.5*2}px;
  display: flex;
`

const BottomSection = styled.div`
  flex: 1 1 2000px;
  margin-top: 1rem;
`

export default () => {
  return (
    <NotificationsConsumer>
			{({ notify }) =>
					<Query
            query={paymentsPage}
						onError={err => notify({
							type: 'error',
							title: 'Ошибка загрузки платежей',
							content: err.message,
						})}
					>
            {({ loading: paymentsLoading,
                error,
								data: {
                  payments,
                  articles,
                  accounts,
                  equipments: equipment
                },
								refetch: refetchPayments
							}) => <>
                <Mutation
                  mutation={syncWithTochkaPayments}
                  onCompleted={() => {
                    refetchPayments()
                    notify({
                      type: 'success',
                      title: 'Платежи синхронизированы с банком'
                    })
                  }}
                  onError={err => notify({
                    type: 'error',
                    title: 'Ошибка синхронизации с Точкой',
                    content: err.message,
                  })}
                >
                  {(syncWithTochkaPayments, { loading }) => 
                    <Header>
                      Платежи
                      <Button
                        ml='auto'
                        icon='sync alternate'
                        content='Точка Банк'
                        onClick={() => syncWithTochkaPayments()}
                        loading={loading}
                      />
                    </Header>
                  }
                </Mutation>
                <Container>
                  { paymentsLoading ? 'Загрузка...' :
                    error ? `Ошибка ${error.message}` : <>
                      <TopSection>
                        <PaymentForm
                          articles={articles}
                          equipment={equipment}
                        />
                        <PaymentStats
                          payments={payments}
                          accounts={accounts}
                        />
                      </TopSection>
                      <BottomSection>
                        <PaymentTable
                          payments={payments}
                        />
                      </BottomSection>
                    </>
                  }
                </Container>
              </>
            }
          </Query>
        }
      </NotificationsConsumer>
  )
}

