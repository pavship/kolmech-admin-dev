import React from 'react'
import cuid from 'cuid'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import OpType from './OpType'
import DealLabour from './DealLabour'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import Appoint from '../Appoint/Appoint'
import { assignNested } from '../../../form/utils'

const Container = styled.div`
  display: flex;
`

const Title = styled(Div)`
  width: 100%;
  ${Container}:hover & {
    ${props => !props.isNew && 'width: 140px;'}
    ${props => !props.isNew && props.isMachiningClass && 'width: 140px;'}
  }
`

const Menu = styled(Div)`
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

export const Op = ({
  basePath = '',
  op,
  opClass,
  opIndex,
  upsertBatch,
  deleteElement,
  budgetMode
}) => {
  const { isNew, appoints, opType, dealLabor } = op
  const isMachiningClass = basePath.startsWith('procs')
  return <Container>
    <Div
      d='flex'
      w={isMachiningClass ? '125px' : '170px'}
    >
      <Div
        isNew={isNew}
        isMachiningClass={isMachiningClass}
        // w={!isNew && isHovered ? (isMachiningClass ? '100px' : '140px') : '100%'}
        whs='nowrap'
        to='ellipsis'
        pos='relative'
      >
        <OpType
          basePath={basePath}
          opType={opType}
          opClass={opClass}
          isNewOp={isNew}
          upsertBatch={upsertBatch}
        />
      </Div>
      {!isNew &&
        <Menu>
          <DropdownMenu>
            <WarningItem
              icon='trash'
              text='Удалить'
              onClick={deleteElement}
            />
          </DropdownMenu>
        </Menu>
      }
    </Div>
    {!isNew && isMachiningClass &&
      <Div
        w='45px'
        bl='1px solid rgba(34,36,38,0.15)'
      >
        <DealLabour
          dealLabor={dealLabor}
          opIndex={opIndex}
          upsertBatch={upsertBatch}
        />
      </Div>
    }
    {!isNew &&
      <Div
        // w={`calc(170px + 90px${budgetMode ? ' + 670px' : ''})`}
        w={budgetMode ? '930px' : '260px'}
        bl='1px solid rgba(34,36,38,0.15)'
      >
        {[
          ...appoints,
          { id: cuid(), isNew: true }
        ].map((appoint, i) =>
          <Appoint
            key={appoint.id}
            basePath={basePath}
            appoint={appoint}
            appointIndex={i}
            op={op}
            opIndex={opIndex}
            upsertBatch={upsertBatch}
            budgetMode={budgetMode}
          />
        )}
      </Div>
    }
  </Container>
}