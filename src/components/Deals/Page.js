import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { dealsPage, upsertDeal } from '../../graphql/deal'
import { NotificationsConsumer } from '../notifications/NotificationsContext'
import { DealsContextProvider } from './context/Context'
import { DetailsProvider } from '../Details/Provider'

import DealsTable from './Table'
import Menu from './Menu'
import { Dimmer, Loader } from 'semantic-ui-react'
import Timeline from './Timeline/Timeline'
import TimelinePlot from './Timeline/Plot/Plot'

import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  /* top: calc(36px); */
  /* top: calc(36px + 23px); */
  width: 100%;
  height: calc(100% - 36px);
  /* height: calc(100% - 36px - 23px); */
  overflow-x: hidden;
  overflow-y: scroll;
  /* z-index: 1; */
`

export default ({
  refreshToken
}) => {
  const [ budgetMode, setBudgetMode ] = useState(true)
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
                    budgetMode={budgetMode}
                    setBudgetMode={setBudgetMode}
                  />
                  <DetailsProvider>
                    <Container>
                      {!loading
                        ? !error
                          ? data && 
                            <DealsContextProvider
                              opTypes={data.opTypes}
                              budgetMode={budgetMode}
                            >
                              <Timeline
                                budgetMode={budgetMode}
                              />
                              <TimelinePlot
                                budgetMode={budgetMode}
                              />
                              <DealsTable
                                notify={notify}
                                deals={data.deals}
                                orgs={data.orgs}
                                upsertDeal={upsertDeal}
                                upsertingDeal={upsertingDeal}
                              />
                            </DealsContextProvider>
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
                  </DetailsProvider>
                  
                </>
              }
            </Query>
          }
        </Mutation>
      }
    </NotificationsConsumer>
  )
}

