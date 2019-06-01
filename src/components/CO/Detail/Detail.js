import React, { useState, useContext } from 'react'
import Menu from '../../Details/Menu/Menu'
// import { useMutation } from 'react-apollo-hooks'
import {
  CODetails as CODetailsQuery,
  createCO as createCOQuery
} from '../../../graphql/deal'
import NotificationsContext, { NotificationsConsumer } from '../../notifications/NotificationsContext'
import { toLocalDateString } from '../../../utils/dates'
import { Div } from '../../styled/styled-semantic'
import Field from '../../form/Field'
import { useMutation, useQuery } from '../../hooks/apolloHooks'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Query } from 'react-apollo';

export default ({
  details: { id },
  setDetails
}) => {
  // const { notify } = useContext(NotificationsContext)
  // const { data, loading } = useQuery(CODetailsQuery, {
  //   onError: err => notify({
  //     type: 'error',
  //     title: 'Ошибка загрузки реквизитов организации',
  //     content: err.message,
  //   })
  // })
  // const { data, loading } = useQuery(CODetailsQuery)
  const { loading, data } = useQuery(CODetailsQuery, { 
    variables: { id },
    errMsg: 'query error!'
    // onCompleted: () => notify({
    //   type: 'success',
    //   title: '!!!',
    // })
    // onCompleted: () => console.log('query completed!'),
    // onError: () => console.log('query error!')
  })
  const [ createCO ] = useMutation(createCOQuery, {
    variables: { id },
    successMsg: 'mutation completed!',
    errMsg: 'mutation error!',
    // onCompleted: () => notify({
    //   type: 'success',
    //   title: '!!!',
    // })
    // onCompleted: () => console.log('mutation completed!'),
    // onError: () => console.log('mutation error!')
  })
  const [ date, setDate ] = useState(toLocalDateString(new Date()))
  const { batches = [] } = (data && data.CODetails) || {}
  // return (
  //   <NotificationsConsumer>
  //     {({ notify }) => 
  //       <Query
  //         query={CODetailsQuery}
  //         variables={{ id }}
  //         onError={err => notify({
  //           type: 'error',
  //           title: 'Ошибка загрузки данных',
  //           content: err.message,
  //         })}
  //       >
  //         {({ loading, data }) => {
  //           const { batches = [] } = (data && data.CODetails) || {}
            return <>
              <Menu
                setDetails={setDetails}
                title='Создать КП'
                onSubmit={() => createCO()}
              />
              { loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> :
                data && <Div
                  p='1em 1em 1em 55px'
                >
                  <Field
                    label='Дата'
                    type='date'
                    value={date}
                    onChange={date => setDate(date)}
                  />
                  {batches.map(({
                    model: { name }
                  }, i) => <p><b>
                    {`${i}. ${name}`}
                  </b></p>)}
                  
                </Div>
              }
            </>
  //         }}
  //       </Query>
  //     }
  //   </NotificationsConsumer>
  // )
    {/* <NotificationsConsumer>
      {({ notify }) => 
        <Query
          query={orgLocal}
          variables={{ id }}
        >
          {({ data: { orgLocal } }) => orgLocal
            ? <>
                <Menu
                  setDetails={setDetails}
                  title='Создать КП'
                  onSubmit='ds'
                />
                {orgLocal.inn
                  ? <Query
                      query={orgDetails}
											variables={{ id }}
											onError={err => notify({
												type: 'error',
												title: 'Ошибка загрузки реквизитов организации',
												content: err.message,
											})}
                    >
											{({ data: { orgDetails }, loading }) =>
												loading ? 'Загрузка..' :
												orgDetails
													?	<>
															<Requisites
																org={orgDetails}
															/>
															<Contract
																notify={notify}
																org={orgDetails}
																initiallyExpanded={section === 'contract'}
															/>
														</>
													: null
                      }
                    </Query>
                  : <InnForm
                      notify={notify}
                      id={id}
                    />
                }
              </>
            : null
          }

        </Query>
      }
    </NotificationsConsumer> */}
}