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

const Wrapper = styled.div`
  display: flex;
`

const Container = styled(Div)`
  display: flex;
`

const Title = styled.div`
  position: relative;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${Container}:hover & {
    ${props => !props.isNew && 'width: 140px;'}
    ${props => !props.isNew && props.isMachiningClass && 'width: 140px;'}
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

export const Op = ({
  basePath,
  op,
  opClass,
  opIndex,
  upsertBatch,
  deleteElement,
  budgetMode
}) => {
  const { id, isNew, appoints, opType, dealLabor } = op
  const isMachiningClass = basePath.endsWith('proc.')
  return <Wrapper>
    <Container
      d='flex'
      w={isMachiningClass ? '125px' : '170px'}
    >
      <Title
        isNew={isNew}
        isMachiningClass={isMachiningClass}
      >
        <OpType
          path={basePath + (isMachiningClass ? `ops[length]` : 'op')}
          opType={opType}
          opClass={opClass}
          isNewOp={isNew}
          upsertBatch={upsertBatch}
        />
      </Title>
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
    </Container>
    {!isNew && isMachiningClass &&
      <Div
        w='45px'
        bl='1px solid rgba(34,36,38,0.15)'
      >
        <DealLabour
          basePath={`${basePath}ops[id=${id}].`}
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
            basePath={basePath + (isMachiningClass ? `ops[id=${id}].` : 'op.')}
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
  </Wrapper>
}