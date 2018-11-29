import React from 'react'
import produce from 'immer'
import { Query } from 'react-apollo'
import { orgEmployees } from '../graphql/employee'

import styled from 'styled-components'

import { Message } from './styled-semantic/styled-semantic';
import GlobalContext from './special/GlobalContext'
import EmployeesPanelMenu from './EmployeesPanelMenu'
import EmployeeDetails from './Employee/Details'
import EmployeeEdit from './EmployeeEdit'
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

const processEmp = emp =>
  produce(emp, draft => {
    const { lName, fName, mName } = draft.person
    draft.person.fullname = [lName, fName, mName].join(' ')
  })

const processEmps = emps => emps.map(emp => processEmp(emp))

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
        >
          {({ loading, error, data, refetch }) => 
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
                        emps={data.orgEmployees}
                      />
                  }
                  <pre>{JSON.stringify(data.orgEmployees, null, 2)}</pre>
                </>}
              </EmployeesPanelTableSection>
              <EmployeeDetailsSection>
                {!bottomPanel.id &&
                  <EmployeeEdit 
                    orgId={bottomPanel.orgId}
                    refetchQueries={refetch}
                  />
                }
                {data && data.orgEmployees && bottomPanel.id && <>
                  {/* TODO change to function with two return statements */}
                  {bottomPanel.editMode
                    ? <EmployeeEdit
                        emp={data.orgEmployees.find(e => e.id === bottomPanel.id)}
                        orgId={bottomPanel.orgId}
                        // toggleEditMode={() => setBottomPanel({
                        //   // bottomPanel: produce(bottomPanel, draft => { delete draft.editMode })
                        //   bottomPanel: { ...bottomPanel, editMode: false }
                        // })}
                        toggleEditMode={() => setBottomPanel(
                          produce(bottomPanel, draft => { delete draft.editMode })
                        )}
                        refetchQueries={refetch}
                      />
                    : <EmployeeDetails
                        emp={processEmp(data.orgEmployees.find(e => e.id === bottomPanel.id))}
                        toggleEditMode={() => setBottomPanel({ ...bottomPanel, editMode: true })}
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
