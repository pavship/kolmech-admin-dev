import React from 'react'

import { Query } from 'react-apollo'
import { dealsPage } from '../../graphql/deal'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import styled from 'styled-components'
import DealsTable from './Table'
// import { Button, Icon } from '../styled/styled-semantic'
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
          query={dealsPage}
          onError={err => notify({
            type: 'error',
            title: 'Ошибка загрузки сделок',
            content: err.message,
          })}
        >
          {({ loading,
              error,
              data,
              refetch
            }) => <>
              <Menu
                title='Сделки'
                titleLinkTo='/deals'
                refreshToken={refreshToken}
              />
              <Container>
                {!loading
                  ? !error
                    ? data && <DealsTable
                        deals={data.deals}
                        orgs={data.orgs}
                      />
                    : `Ошибка ${error.message}`
                  : <Dimmer
                      active
                    >
                      <Loader>
                        Загрузка..
                      </Loader>
                    </Dimmer>
                }
              </Container>
            </>
          }
        </Query>
      }
    </NotificationsConsumer>
  )
}

