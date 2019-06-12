import React, { useState } from 'react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from './Name'
import { assignNested } from '../../../form/utils'
import { personExec } from '../../../../graphql/person'

const ExecContainer = styled.div`
  display: flex;
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
  background: rgba(0,0,0,.05);
`

const WarningItem = styled(Dropdown.Item)`
  :hover {
    color: #9f3a38 !important;
    .icon {
      color: #9f3a38 !important;
    }
  }
`

export const Exec = ({
  exec,
  execIndex,
  opIndex,
  opTypeId,
  upsertBatch,
}) => {
  const { isNew, person } = exec
  const [isHovered, setIsHovered] = useState(false)
  return <ExecContainer>
    <Div
      d='flex'
      w='170px'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Div
        w={isHovered ? '140px' : '100%'}
      >
        <ExecName
          exec={exec}
          opIndex={opIndex}
          opTypeId={opTypeId}
          upsertBatch={upsertBatch}
        />
      </Div>
      {!isNew && isHovered &&
        <DropdownMenu>
          <WarningItem
            icon='trash'
            text='Удалить'
            onClick={() => upsertBatch(draft => {
              assignNested(draft, `procs[0].ops[${opIndex}].execs[${execIndex}].disconnect`, true)
            }, { refetchQueries: [{ query: personExec, variables: { id: person.id } }] })}
          />
        </DropdownMenu>
      }
    </Div>
  </ExecContainer>
}