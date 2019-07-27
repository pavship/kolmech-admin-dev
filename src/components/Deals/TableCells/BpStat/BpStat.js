import React, { useState, useContext } from 'react'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'
import styled from 'styled-components'
import { Div, Icon } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from '../Exec/Name'
import Task from '../../Task/Task'

const FlexContainer = styled.div`
  display: flex;
`

export default function BpStat ({
  bpStat,
  budgetMode
}) {
  const {
    id,
    factCost,
		factLabor,
		factRevenue,
		planCost,
		planLabor,
		planRevenue,
  } = bpStat || {}
  return <FlexContainer>
    <Div
      w='90px'
      pl='2px'
      bl='1px solid rgba(34,36,38,0.15)'
    >
      {`${factLabor || '- '}/${planLabor || ' -'} ч`}
      {/* {bpStat === null
        ? '122.4/130.8 ч'
        : `${factLabor || '- '}/${planLabor || ' -'} ч`
      } */}
    </Div>
    {budgetMode && <>
      <Div
        w='90px'
        bl='1px solid rgba(34,36,38,0.15)'
        ta='right'
        pr='2px'
      >
        <Icon
          name='hand paper'
          size='small'
          fl='left'
          m='2px auto 0 1px'
          color='grey'
        />
        1 000 000 ₽
      </Div>
      <Div
        w='80px'
        bl='1px solid rgba(34,36,38,0.15)'
        ta='right'
        pr='2px'
      >
        1 000 000 ₽
      </Div>
      <Div
        w='500px'
        bl='1px solid rgba(34,36,38,0.15)'
      >
        ..
      </Div>
    </>}
  </FlexContainer>
}