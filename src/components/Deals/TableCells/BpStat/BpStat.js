import React, { useState, useContext } from 'react'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'
import styled from 'styled-components'
import { Div, Icon } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from '../Exec/Name'
import Task from '../../Task/Task'
import Stat from './Stat';

const FlexContainer = styled.div`
  display: flex;
`

export default function BpStat ({
  bpStat,
  budgetMode,
  upsertParent
}) {
  const {
		autoPlanCost,
		autoPlanLabor,
		autoPlanRevenue,
    factCost,
		factLabor,
    factRevenue,
    planCost,
		planLabor,
    planRevenue
  } = bpStat || {}
  return <FlexContainer>
    <Div
      w='90px'
      pl='2px'
      c={factLabor || planLabor ? undefined : 'rgba(34,36,38,0.6)'}
      bl='1px solid rgba(34,36,38,0.15)'
    >
      <Stat
        type='labor'
        value={planLabor}
        isAuto={autoPlanLabor}
        onChange={value => {
          upsertParent(draft => {
            assignNested(draft, `bpStat.planLabor`, value)
            assignNested(draft, `bpStat.autoPlanLabor`, false, true)
          })
        }}
        onAutoEnable={() => {
          upsertParent(draft => {
            assignNested(draft, `bpStat.autoPlanLabor`, true)
          })
        }}
      />
    </Div>
    {budgetMode && <>
      <Div
        w='90px'
        pr='2px'
        c={factRevenue || planRevenue ? undefined : 'rgba(34,36,38,0.6)'}
        ta='right'
        bl='1px solid rgba(34,36,38,0.15)'
      >
        <Stat
          type='currency'
          value={planRevenue}
          isAuto={autoPlanRevenue}
          onChange={value => {
            upsertParent(draft => {
              assignNested(draft, `bpStat.planRevenue`, value)
              assignNested(draft, `bpStat.autoPlanRevenue`, false, true)
            })
          }}
          onAutoEnable={() => {
            upsertParent(draft => {
              assignNested(draft, `bpStat.autoPlanRevenue`, true)
            })
          }}
        />
      </Div>
      <Div
        w='80px'
        pr='2px'
        c={factCost || planCost ? undefined : 'rgba(34,36,38,0.6)'}
        ta='right'
        bl='1px solid rgba(34,36,38,0.15)'
      >
        <Stat
          type='currency'
          value={planCost}
          isAuto={autoPlanCost}
          onChange={value => {
            upsertParent(draft => {
              assignNested(draft, `bpStat.planCost`, value)
              assignNested(draft, `bpStat.autoPlanCost`, false, true)
            })
          }}
          onAutoEnable={() => {
            upsertParent(draft => {
              assignNested(draft, `bpStat.autoPlanCost`, true)
            })
          }}
        />
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