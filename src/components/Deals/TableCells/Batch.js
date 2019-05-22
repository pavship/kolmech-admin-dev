import React from 'react'
import { Mutation } from 'react-apollo'
import { upsertDeal } from '../../../graphql/deal'
// import { dealFragmentMiddle } from '../../../graphql/deal'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import Model from './Model'
import Qty from './Qty'
import Procs from './Procs'

const BatchContainer = styled.div`
  display: flex;
`

export default ({
  notify,
  deal,
  batch,
}) => {
  return <>
    <Mutation
      mutation={upsertDeal}
      onCompleted={(res) => {
        // console.log('res > ', res)
        notify({
          type: 'success',
          title: 'Модель изделия сохранена'
        })
      }}
      onError={err => notify({
        type: 'error',
        title: 'Ошибка. Модель изделия не сохранена',
        content: err.message,
      })}
    >
      {(upsertDeal, { loading: upserting }) => <BatchContainer>
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
            w='170px'
            z='100'
          >
            <Procs
              notify={notify}
              deal={deal}
              batch={batch}
              upsertDeal={upsertDeal}
            />
          </Div>
        </>}
      </BatchContainer>}
    </Mutation>
  </>
}