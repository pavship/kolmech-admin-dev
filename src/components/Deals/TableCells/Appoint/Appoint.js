import React, { useState, useContext } from 'react'
import { useMutation } from '../../../hooks/apolloHooks'
import { upsertAppoint as uAq } from '../../../../graphql/appoint'
import { getStructure, assignNested } from '../../../form/utils'
import produce from 'immer'

import DetailsContext from '../../../Details/Provider'
import styled from 'styled-components'
import { Div, Icon } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from '../Exec/Name'
import Task from '../../Task/Task'
import BpStat from '../BpStat/BpStat'

const FlexContainer = styled.div`
  display: flex;
  position: relative;
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
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
  budgetMode
}) {
  const { opType: { id: opTypeId } } = op
  const { id: appointId, isNew, tasks, bpStat } = appoint
  const { setDetails } = useContext(DetailsContext)
  const [isHovered, setIsHovered] = useState(false)
  const [ upsertAppointProto ] = useMutation(uAq)
  const upsertAppoint = (draftHandler, options = {}) => upsertAppointProto({ variables: { input:
    produce(getStructure(appoint), draftHandler)
  }, ...options})
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
            />
            <Dropdown.Item
              icon='plus'
              text='Задача'
              onClick={() => setDetails({ appointId, type: 'createTask' })}
            />
          </DropdownMenu>
        }
      </Div>
      {!isNew &&
        <BpStat
          bpStat={bpStat}
          budgetMode={budgetMode}
          upsertParent={upsertAppoint}
        />
      }
      {/* <Div
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
      </Div> */}
    </FlexContainer>
  </>
}