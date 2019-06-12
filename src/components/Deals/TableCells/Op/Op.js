import React, { useState } from 'react'
import cuid from 'cuid'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import OpType from './OpType'
import DealLabour from './DealLabour'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import { Exec } from '../Exec/Exec'

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

export const Op = ({
  deal,
  batch,
  proc,
  op,
  upsertDeal,
  upsertBatch
}) => {
  const { id, isNew, execs, opType } = op
  console.log('op > ', op)
  const [isHovered, setIsHovered] = useState(false)
  const opIndex = !isNew && proc.ops.findIndex(o => o.id === id)
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
                draft.procs[0].ops.splice(opIndex, 1)
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
        <Div
          w='170px'
        >
          {[
            ...execs,
            { id: cuid(), isNew: true }
          ].map(exec =>
            <Exec
              key={exec.id}
              exec={exec}
              opIndex={opIndex}
              opTypeId={opType.id}
              upsertBatch={upsertBatch}
            />
          )}
        </Div>
      </>}
    </FlexContainer>
  </>
}