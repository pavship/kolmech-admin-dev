import React from 'react'
import { Div } from '../styled/styled-semantic';

import { Query } from 'react-apollo'
import { payments } from '../../graphql/payment'

import styled from 'styled-components'
import PaymentForm from './Form'
import PaymentTable from './Table_SemanticUI(deprecated)'

const Container = styled.div`
  height: 900px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const TopSection = styled.div`
  flex: 1 0 content;
  /* flex-grow: 1;
  flex-shrink: 0;
  flex-basis */
`

const BottomSection = styled.div`
  flex: 1 1 2000px;
  margin-top: 1rem;
  /* flex-grow: 1;
  flex-shrink: 0;
  flex-basis */
`

export default ({
  
}) => {
  return (
    <Query
      query={payments}
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

