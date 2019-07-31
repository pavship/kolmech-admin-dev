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
  const { budgetMode } = useContext(DealsContext)
  const [ upsertBatchProto ] = useMutation(uBq)
  const upsertBatch = (draftHandler, options = {}) =>
    upsertBatchProto({ variables: { input:
      produce(getStructure(batch), draftHandler)
    }, ...options})
  const { isNew, bpStat, ops, procs, model } = produce(batch, draft => {
    if (!draft.procs[0]) return
    // if (!draft.bpStat) draft.bpStat = {
    // draft.bpStat = {
    //   planCost: 0,
    //   planLabor: 0,
    //   planRevenue: 0,
    // }
    // const { bpStat } = draft
    const batchAutoStat = {
      planCost: 0,
      planLabor: 0,
      planRevenue: 0,
    }
    draft.procs[0].ops.forEach(op => {
      op.appoints.forEach(ap => {
        if (!ap.bpStat) ap.bpStat = {}
        const { bpStat, laborCost } = ap
        const {
          autoPlanCost,
          autoPlanLabor,
          autoPlanRevenue,
        } = bpStat
        if (autoPlanLabor !== false)
          bpStat.planLabor = op.dealLabor
        if (autoPlanCost !== false)
          if (laborCost && bpStat.planLabor)
            bpStat.planCost = laborCost*bpStat.planLabor
          else bpStat.planCost = undefined
        if (autoPlanRevenue !== false)
          if (op.laborPrice && op.dealLabor)
            bpStat.planRevenue = op.laborPrice*op.dealLabor
          else bpStat.planRevenue = undefined
        // console.log('draft > ', JSON.stringify(draft))
        for (let key of ['planCost', 'planLabor', 'planRevenue']) {
          if (bpStat[key]) batchAutoStat[key] += bpStat[key]
        }
        // ['planCost', 'planLabor', 'planRevenue'].forEach(key => {
        //   if (bpStat[key]) draft.bpStat[key] += bpStat[key]
        // })
      })
    })
    if (!draft.bpStat) draft.bpStat = batchAutoStat
    else
      for (let key of ['autoPlanCost', 'autoPlanLabor', 'autoPlanRevenue']) {
        if (draft.bpStat[key] !== false)
          draft.bpStat['p'+key.slice(5)] = batchAutoStat['p'+key.slice(5)]
      }
  })
  console.log('bpStat > ', bpStat)
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
        // autoBpStat={autoBpStat}
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