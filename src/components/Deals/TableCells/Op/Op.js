import React, { useState } from 'react'
import cuid from 'cuid'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import OpType from './OpType'
import DealLabour from './DealLabour'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import { Exec } from '../Exec/Exec'
import { assignNested } from '../../../form/utils';

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
  op,
  opIndex,
  upsertBatch
}) => {
  const { isNew, execs, opType, dealLabor } = op
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
          w={!isNew && isHovered ? '100px' : '100%'}
        >
          <OpType
            opType={opType}
            isNewOp={isNew}
            upsertBatch={upsertBatch}
          />
        </Div>
        {!isNew && isHovered &&
          <DropdownMenu>
            <WarningItem
              icon='trash'
              text='Удалить'
              onClick={() => upsertBatch(draft => {
                // draft.procs[0].ops.splice(opIndex, 1)
                assignNested(draft, `procs[0].ops[${opIndex}]`, {})
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
            dealLabor={dealLabor}
            opIndex={opIndex}
            upsertBatch={upsertBatch}
          />
        </Div>
        <Div
          w='170px'
        >
          {[
            ...execs,
            { id: cuid(), isNew: true }
          ].map((exec, i) =>
            <Exec
              key={exec.id}
              exec={exec}
              execIndex={i}
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