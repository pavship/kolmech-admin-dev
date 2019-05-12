import React, { useState } from 'react'

import { Query, Mutation } from 'react-apollo'
import { paymentsPage } from '../../graphql/payment'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import styled from 'styled-components'
// import PaymentTable from './Table'
import { Button, Icon } from '../styled/styled-semantic'
import Menu from '../Menu'
import { Dimmer, Loader } from 'semantic-ui-react'

const Container = styled.div`
  height: calc(100% - 36px);
  position: relative;
`

export default ({
  refreshToken
}) => {
  // const [activePayment, setActivePayment] = useState(null)
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
                orgs,
                accounts,
                equipments: equipment
              },
              refetch: refetchPayments
            }) => <>
              <Menu
                title='Сделки'
                titleLinkTo='/deals'
                refreshToken={refreshToken}
              />
              <Container>
                <Dimmer
                  active
                >
                  <Loader>
                    Загрузка..
                  </Loader>
                </Dimmer>
                {/* { paymentsLoading ? 'Загрузка...' :
                  error ? `Ошибка ${error.message}` : <>
                    <TopSection>
                      <Route
                        exact
                        path="/pay"
                        render={() => (<>
                          <PaymentForm
                            payment={activePayment}
                            reset={() => setActivePayment(null)}
                            articles={articles}
                            orgs={orgs}
                            equipment={equipment}
                          />
                          <PaymentStats
                            payments={payments}
                            accounts={accounts}
                            orgs={orgs}
                          />
                        </>)}
                      />
                      <Route
                        exact
                        path="/pay/chart"
                        render={() => (
                          <PaymentChart
                            payments={payments}
                          />
                        )}
                      />
                    </TopSection>
                    <BottomSection>
                      <PaymentTable
                        payments={payments}
                        activePayment={activePayment}
                        onClickRow={id => setActivePayment(payments.find(p => p.id === id))}
                      />
                    </BottomSection>
                  </>
                } */}
              </Container>
            </>
          }
        </Query>
      }
    </NotificationsConsumer>
  )
}

