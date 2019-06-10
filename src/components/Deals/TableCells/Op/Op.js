import React, { useState } from 'react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import OpType from './OpType'
import DealLabour from './DealLabour'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import { Exec } from '../Exec/Exec';

const FlexContainer = styled.div`
  display: flex;
`

const WarningItem = styled(Dropdown.Item)`
  :hover {
    color: #9f3a38 !important;
    .icon {
      color: #9f3a38 !important;
    }
  }
`

const ExecContainer = styled.div`
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
  background: rgba(0,0,0,.05);
`

export const Op = ({
  deal,
  batch,
  proc,
  op,
  upsertDeal,
  upsertBatch
}) => {
  const { id, isNew, execs } = op
  const [isHovered, setIsHovered] = useState(false)
  return <>
    <FlexContainer>
      <Div
        d='flex'
        w='130px'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Div
          w={isHovered ? '100px' : '100%'}
        >
          <OpType
            proc={proc}
            op={op}
            upsertBatch={upsertBatch}
          />
        </Div>
        {!isNew && isHovered &&
          <DropdownMenu>
            <WarningItem
              icon='trash'
              text='Удалить'
              onClick={() => upsertBatch(draft => {
                const ops = draft.procs[0].ops
                ops.splice(ops.findIndex(o => o.id === id), 1)
              })}
            />
          </DropdownMenu>
        }
      </Div>
      {!isNew && <>
        <Div
          w='40px'
          bl='1px solid rgba(34,36,38,0.15);'
        >
          <DealLabour
            deal={deal}
            batch={batch}
            proc={proc}
            op={op}
            upsertDeal={upsertDeal}
          />
        </Div>
        {execs.map(exec =>
          <ExecContainer>
            <Exec
            />
          </ExecContainer>
        )}
      </>}
    </FlexContainer>
  </>
}