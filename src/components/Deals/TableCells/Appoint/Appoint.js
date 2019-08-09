import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
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

const Wrapper = styled.div`
  display: flex;
  position: relative;
  :not(:last-child) {
    border-bottom: 1px solid rgba(34,36,38,0.15);
  }
`

const Container = styled.div`
  display: flex;
  width: 170px;
`

const Title = styled(Div)`
  width: 100%;
  ${Container}:hover & {
    width: 139px;
  }
`

const Menu = styled.div`
  display: none;
  margin-left: auto;
  ${Container}:hover & {
    display: unset;
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
  op,
  opIndex,
  upsertBatch,
  budgetMode
}) {
  const { opType } = op
  const { id: appointId, isNew, tasks, bpStat } = appoint
  const { setDetails } = useContext(DetailsContext)
  const [ upsertAppointProto ] = useMutation(uAq)
  const upsertAppoint = (draftHandler, options = {}) => upsertAppointProto({ variables: { input:
    produce(getStructure(appoint), draftHandler)
  }, ...options})
  return <Wrapper>
    <Container
      d='flex'
      w='170px'
    >
      <Title
        whs='nowrap'
        to='ellipsis'
        pos='relative'
      >
        <ExecName
          basePath={basePath}
          appoint={appoint}
          opIndex={opIndex}
          opType={opType}
          upsertBatch={upsertBatch}
        />
      </Title>
      {!isNew &&
        <Menu>
          <DropdownMenu>
            <WarningItem
              icon='remove'
              text='Открепить'
              onClick={() => upsertBatch(draft => {
                assignNested(draft, `${basePath}appoints[id=${appointId}]`, {})
              })}
            />
            <Dropdown.Item
              icon='plus'
              text='Задача'
              onClick={() => setDetails({ appointId, type: 'createTask' })}
            />
          </DropdownMenu>
        </Menu>
      }
    </Container>
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
  </Wrapper>
}