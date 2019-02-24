import React from 'react'

import { Query } from 'react-apollo'
import { paymentsPage } from '../../graphql/payment'

import styled from 'styled-components'
import PaymentForm from './Form'
import PaymentStats from './Stats'
import PaymentTable from './Table'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const TopSection = styled.div`
  flex: 1 0 content;
  min-height: 308px;
  display: flex;
`

const BottomSection = styled.div`
  flex: 1 1 2000px;
  margin-top: 1rem;
`

export default ({
  
}) => {
  return (
    <Query
      query={paymentsPage}
    >
      {({ loading, error, data }) => 
        <Container>
          { loading ? 'Загрузка...' :
            error ? `Ошибка ${error.message}` : 
            console.log('data > ', data) || <>
              <TopSection>
                <PaymentForm
                  articles={data.articles.map(a => 
                    ({ key: a.id, text: a.rusName, value: a.id })
                  )}
                />
                <PaymentStats
                  // TODO make postgres aggregation query on server side instead of reduce here
                  accounts={data.payments
                    .reduce((accounts, p) => {
                      const account = accounts.find(a => a.id === p.account.id)
                      account.total += (p.isIncome ? 1 : -1) * p.amount
                      return accounts
                    }, data.accounts.map(a => ({ ...a, total: 0 }))
                  )}
                />
              </TopSection>
              <BottomSection>
                <PaymentTable
                  payments={data.payments}
                />
              </BottomSection>
            </>
          }
        </Container>
      }
    </Query>
  )
}

