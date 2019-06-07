import React from 'react'
import { useMutation } from '../../hooks/apolloHooks'
import { upsertBatch as uBq } from '../../../graphql/batch'
import { getStructure } from '../../form/utils'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import Model from './Model'
import Qty from './Qty'
import Procs from './Procs'
import produce from 'immer';

const BatchContainer = styled.div`
  display: flex;
`

export default ({
  notify,
  deal,
  batch,
  upsertDeal
}) => {
  const [ upsertBatchProto ] = useMutation(uBq)
  const upsertBatch = draftHandler => upsertBatchProto({ variables: { input:
    produce(getStructure(batch), draftHandler)
  }})
  return <>
    <BatchContainer>
      <Div
        w='130px'
        br={batch.id !== 0 ? '1px solid rgba(34,36,38,0.15);' : undefined}
      >
        <Model
          deal={deal}
          batch={batch}
          upsertDeal={upsertDeal}
        />
      </Div>
      {batch.id !== 0 && <>
        <Div
          w='40px;'
        >
          <Qty
            deal={deal}
            batchId={batch.id}
            qty={batch.qty}
            upsertDeal={upsertDeal}
          />
        </Div>
        <Div
          w='calc(170px+140px)'
        >
          <Procs
            notify={notify}
            deal={deal}
            batch={batch}
            upsertDeal={upsertDeal}
            upsertBatch={upsertBatch}
          />
        </Div>
      </>}
    </BatchContainer>
  </>
}