import React from 'react'
import { Query } from 'react-apollo'
import { orgEmployees } from '../graphql/employee'

import styled from 'styled-components'

import GlobalContext from './special/GlobalContext'
import EmployeesPanelMenu from './EmployeesPanelMenu'
import Employee from './Employee'
import EmployeeEdit from './EmployeeEdit'
// import { Message } from 'semantic-ui-react';
import { Message } from './styled-semantic/styled-semantic';
import EmployeesTable from './Employee/EmployeesTable';

const EmployeesPanelBody = styled.div`
  display: flex;
  height: calc(100% - 37px);
`

const EmployeesPanelTableSection = styled.div`
  flex: 0 0 600px;
`

const EmployeeDetailsSection = styled.div`
  flex: 0 0 480px;
  border: solid rgb(156,156,159);
  border-width: 0 1px;
  min-height: 100%;
`

export default ({
  closePanel
}) => {
  return (
    <GlobalContext>
      {({ bottomPanel, setBottomPanel }) => <>
        <EmployeesPanelMenu 
          closePanel={closePanel}
        />
        <Query
          query={orgEmployees}
          variables={{ orgId: bottomPanel.orgId }}
          onCompleted={(data) => console.log(data)}
        >
          {({ loading, error, data }) => 
            <EmployeesPanelBody>
              <EmployeesPanelTableSection>
                {loading && "Загрузка..."}
                {error && `Ошибка ${error.message}`}
                {data && data.orgEmployees && <>
                  {!data.orgEmployees.length
                    ? <Message
                        m='1em'
                        content={<>
                          Добавьте первого представителя<br/>
                          👉
                        </>}
                      />
                    : <EmployeesTable
                        employees={data.orgEmployees}
                      />
                  }
                  <pre>{JSON.stringify(data.orgEmployees, null, 2)}</pre>
                </>}
              </EmployeesPanelTableSection>
              <EmployeeDetailsSection>
                {/* <pre>{JSON.stringify(bottomPanel, null, 2)}</pre> */}
                {!bottomPanel.id &&
                  <EmployeeEdit 
                    orgId={bottomPanel.orgId}
                  />
                }
                {data && data.orgEmployees && bottomPanel.id && <>
                  {/* TODO change to function with two return statements */}
                  {bottomPanel.editMode
                    ? <EmployeeEdit
                        orgId={bottomPanel.orgId}
                        emp={data.orgEmployees.find(e => e.id === bottomPanel.id)}
                      />
                    : <Employee
                        emp={data.orgEmployees.find(e => e.id === bottomPanel.id)}
                      />
                  }
                  <pre>{JSON.stringify(data.orgEmployees, null, 2)}</pre>
                </>}
              </EmployeeDetailsSection>
            </EmployeesPanelBody>
          }
        </Query>
      </>}
    </GlobalContext>
  )
}
