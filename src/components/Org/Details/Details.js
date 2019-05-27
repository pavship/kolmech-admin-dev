import React from 'react'
import Menu from '../../Details/Menu'
import { Query } from 'react-apollo'
import { orgLocal, orgDetails } from '../../../graphql/org'
import { NotificationsConsumer } from '../../notifications/NotificationsContext'
import InnForm from './InnForm'
import Requisites from './Requisites';

export default ({
  details: {
    id
  },
  setDetails
}) => {
  return <>
    <NotificationsConsumer>
      {({ notify }) => 
        <Query
          query={orgLocal}
          variables={{ id }}
        >
          {({ data: { orgLocal } }) => orgLocal
            ? <>
                <Menu
                  setDetails={setDetails}
                  title={orgLocal.name}
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
													?	<Requisites
															org={orgDetails}
														/>
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
    </NotificationsConsumer>
  </>
}