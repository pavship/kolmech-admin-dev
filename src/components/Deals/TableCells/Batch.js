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
// import { useMutation } from 'react-apollo-hooks';
import { Mutation } from 'react-apollo';

const BatchContainer = styled.div`
  display: flex;
`

export default function Batch ({
  deal,
  batch,
  upsertDeal,
}) {
  console.log('Batch > ')
  const [ upsertBatchProto ] = useMutation(uBq)
  const upsertBatch = draftHandler => upsertBatchProto({ variables: { input:
    // console.log('produce(getStructure(batch), draftHandler) > ', produce(getStructure(batch), draftHandler)) || 
    produce(getStructure(batch), draftHandler)
  }})
  // return <>
  // <Mutation
  //   mutation={uBq}
  //   onError={() => console.log('onError > ')}
  //   onCompleted={() => console.log('onCompleted > ')}
  // >
  //   {( upsertBatchProto ) => {
  //     const upsertBatch = draftHandler => upsertBatchProto({ variables: { input:
  //       // console.log('produce(getStructure(batch), draftHandler) > ', produce(getStructure(batch), draftHandler)) || 
  //       produce(getStructure(batch), draftHandler)
  //     }})
      return <BatchContainer>
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
              deal={deal}
              batch={batch}
              upsertDeal={upsertDeal}
              upsertBatch={upsertBatch}
            />
          </Div>
        </>}
      </BatchContainer>
  //   }}
    
  //   </Mutation>
  // </>
}