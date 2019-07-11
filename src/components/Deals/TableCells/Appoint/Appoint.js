import React, { useState, useContext } from 'react'
import cuid from 'cuid'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'
import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from '../Exec/Name'
import Task from '../../Task/Task';

const FlexContainer = styled.div`
  display: flex;
  position: relative;
`

const WarningItem = styled(Dropdown.Item)`
  :hover {
    color: #9f3a38 !important;
    .icon {
      color: #9f3a38 !important;
    }
  }
`

export default function Appoint ({
  basePath,
  appoint,
  appointIndex,
  op,
  opIndex,
  upsertBatch,
}) {
  const { opType: { id: opTypeId } } = op
  const { id: appointId, isNew, tasks } = appoint
  const { setDetails } = useContext(DetailsContext)
  const [isHovered, setIsHovered] = useState(false)
  return <>
    <FlexContainer>
      <Div
        d='flex'
        w='170px'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Div
          w={isHovered ? '140px' : '100%'}
          whs='nowrap'
          to='ellipsis'
          pos='relative'
        >
          <ExecName
            basePath={basePath}
            appoint={appoint}
            opIndex={opIndex}
            opTypeId={opTypeId}
            upsertBatch={upsertBatch}
          />
        </Div>
        {!isNew && isHovered &&
          <DropdownMenu>
            <WarningItem
              icon='remove'
              text='Открепить'
              onClick={() => upsertBatch(draft => {
                assignNested(draft, basePath + `ops[${opIndex}].appoints[${appointIndex}]`, {})
              })}
              // }, { refetchQueries: [{ query: personExec, variables: { id: person.id } }] })}
            />
            <Dropdown.Item
              icon='plus'
              text='Задача'
              onClick={() => setDetails({ appointId, type: 'createTask' })}
            />
          </DropdownMenu>
        }
      </Div>
      <Div
        pos='absolute'
        l='170px'
        w='2000px'
        h='100%'
        pe='none'
      >
        {tasks && tasks.map(task =>
          <Task
            key={task.id}
            task={task}
          />
        )}
      </Div>
    </FlexContainer>
  </>
}