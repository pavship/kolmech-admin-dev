import React, { useState } from 'react'
import produce from 'immer'
import { getStructure } from '../../../form/utils'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import Type from './OpType'
import DealLabour from './DealLabour'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'

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
  opTypes,
  upsertDeal,
  upsertBatch
}) => {
  const { id, isNew } = op
  const [isHovered, setIsHovered] = useState(false)
  // const batchStructure = getStructure(batch)
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
          <Type
            deal={deal}
            batch={batch}
            proc={proc}
            op={op}
            opTypes={opTypes}
            upsertDeal={upsertDeal}
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
      {!isNew &&
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
      }
      {/* {batch.id !== 0 &&
        <Div
          w='170px;'
          z='12'
        >
          <Prods
            notify={notify}
            deal={deal}
            batch={batch}
            upsertDeal={upsertDeal}
          />
        </Div>
      } */}
    </FlexContainer>
  </>
}