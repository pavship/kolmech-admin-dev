import React, { useState } from 'react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from './Name'

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
  opIndex,
  upsertBatch,
}) => {
  const { isNew } = exec
  const [isHovered, setIsHovered] = useState(false)
  return <ExecContainer>
    <Div
      d='flex'
      w='140px'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Div
        w={isHovered ? '110px' : '100%'}
      >
        <ExecName
          exec={exec}
          opIndex={opIndex}
          upsertBatch={upsertBatch}
        />
      </Div>
      {!isNew && isHovered &&
        <DropdownMenu>
          <WarningItem
            icon='trash'
            text='Удалить'
            onClick={() => upsertBatch(draft => {
              // const ops = draft.procs[0].ops
              // ops.splice(ops.findIndex(o => o.id === id), 1)
            })}
          />
        </DropdownMenu>
      }
    </Div>
  </ExecContainer>
}