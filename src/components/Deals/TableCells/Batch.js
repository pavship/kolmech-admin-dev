import React, { useContext } from 'react'
import { useMutation } from '../../hooks/apolloHooks'
import { upsertBatch as uBq } from '../../../graphql/batch'
import { getStructure } from '../../form/utils'
import produce from 'immer'

import { DealsContext } from '../context/Context'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import Model from './Model'
import Qty from './Qty'
import ProcOps from './ProcOps'
import BpStat from './BpStat/BpStat'

const BatchContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(34,36,38,0.15);
`

export default function Batch ({
  deal,
  batch,
  upsertDeal,
}) {
  const { isNew, bpStat, ops, procs, model } = batch
  const { budgetMode } = useContext(DealsContext)
  const [ upsertBatchProto ] = useMutation(uBq)
  const upsertBatch = (draftHandler, options = {}) => upsertBatchProto({ variables: { input:
    produce(getStructure(batch), draftHandler)
  }, ...options})
  const bpStatFieldNames = [
    ['autoPlanLabor', 'planLabor'],
    ['autoPlanRevenue', 'planRevenue'],
    ['autoPlanCost', 'planCost'],
  ]
  const autoBpStat = procs[0] && procs[0].ops &&
    procs[0].ops.reduce((stat, op) => {
      console.log('stat, op > ', stat, op)
      if (op.appoints) op.appoints.forEach(ap => {
        bpStatFieldNames.forEach(([ autoFName, fName ]) => {
          if (ap.bpStat && ap.bpStat[autoFName] === false) stat[fName] += ap.bpStat[fName]
        })
      })
      return stat
    },{
      planCost: 0,
      planLabor: 0,
      planRevenue: 0,
    })
  return <BatchContainer>
    <Div
      d='flex'
      bb='1px solid rgba(34, 36, 38, 0.15)'
    >
      <Div
        w='300px'
        br={isNew ? undefined : '1px solid rgba(34,36,38,0.15);'}
      >
        <Model
          batch={batch}
          deal={deal}
          model={model}
          upsertDeal={upsertDeal}
        />
      </Div>
      <Div
        w='50px'
      >
        <Qty
          deal={deal}
          batch={batch}
          upsertDeal={upsertDeal}
        />
      </Div>
      <BpStat
        bpStat={bpStat}
        autoBpStat={autoBpStat}
        upsertParent={upsertBatch}
        budgetMode={budgetMode}
      />
    </Div>
    <Div
      pl='9px'
      bl='1px solid rgba(34, 36, 38, 0.15)'
    >
      <ProcOps
        modelId={model.id}
        ops={ops}
        procs={procs}
        upsertBatch={upsertBatch}
        budgetMode={budgetMode}
      />
    </Div>
  </BatchContainer>
}