import React, { useContext } from 'react'
import { useMutation } from '../../hooks/apolloHooks'
import { upsertBatch as uBq } from '../../../graphql/batch'
import { getStructure } from '../../form/utils'

import { DealsContext } from '../context/Context'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import Model from './Model'
import Qty from './Qty'
import ProcOps from './ProcOps'
import produce from 'immer'
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
  const { isNew, ops, procs, model } = batch
  const { budgetMode } = useContext(DealsContext)
  const [ upsertBatchProto ] = useMutation(uBq)
  const upsertBatch = (draftHandler, options = {}) => upsertBatchProto({ variables: { input:
    produce(getStructure(batch), draftHandler)
  }, ...options})
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
      {/* <Div
        w='170px'
      > */}
        <Div
          w='50px'
        >
          <Qty
            deal={deal}
            batch={batch}
            upsertDeal={upsertDeal}
          />
        </Div>
      {/* </Div> */}
      <BpStat
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