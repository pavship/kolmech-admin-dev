import React from 'react'

import { Query, Mutation } from 'react-apollo'
import { dealsPage, upsertDeal } from '../../graphql/deal'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import styled from 'styled-components'
import DealsTable from './Table'
import Menu from './Menu'
import { Dimmer, Loader } from 'semantic-ui-react'
import { ContextProvider } from './context/DealsContext';
import { DetailsProvider } from '../Details/Provider';

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
        <Mutation
          mutation={upsertDeal}
          onCompleted={res => {
            // console.log('res > ', res)
            notify({
              type: 'success',
              title: 'Информация сохранена'
            })
          }}
          onError={err => notify({
            type: 'error',
            title: 'Ошибка сохранения сделки',
            content: err.message,
          })}
        >
          {(upsertDeal, { loading: upsertingDeal }) => 
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
                    notify={notify}
                    title='Сделки'
                    titleLinkTo='/deals'
                    refreshToken={refreshToken}
                    refetchDeals={refetch}
                  />
                  <DetailsProvider>
                    {/* {({ details, setDetails }) => <> */}
                      {!loading
                        ? !error
                          ? data && 
                            <ContextProvider
                              opTypes={data.opTypes}
                            >
                              <DealsTable
                                notify={notify}
                                deals={data.deals}
                                orgs={data.orgs}
                                upsertDeal={upsertDeal}
                                upsertingDeal={upsertingDeal}
                              />
                            </ContextProvider>
                          : `Ошибка ${error.message}`
                        : <Dimmer
                            active
                          >
                            <Loader>
                              Загрузка..
                            </Loader>
                          </Dimmer>
                      }
                    {/* </>} */}
                  </DetailsProvider>
                  {/* <Container>
                  </Container> */}
                </>
              }
            </Query>
          }
        </Mutation>
      }
    </NotificationsConsumer>
  )
}

