import React from 'react'
// import { Mutation } from 'react-apollo'
// import { upsertDeal } from '../../../graphql/deal'
// import { dealFragmentMiddle } from '../../../graphql/deal'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import Type from './OpType'
import DealLabour from './DealLabour';

const FlexContainer = styled.div`
  display: flex;
`

export default ({
  notify,
  deal,
  batch,
  proc,
  op,
  opTypes,
  upsertDeal,
}) => {
  return <>
    {/* <Mutation
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
      {(upsertDeal, { loading: upserting }) =>  */}
        <FlexContainer>
          <Div
            w='130px'
            // br={batch.id !== 0 ? '1px solid rgba(34,36,38,0.15);' : undefined}
          >
            <Type
              deal={deal}
              batch={batch}
              proc={proc}
              op={op}
              opTypes={opTypes}
              upsertDeal={upsertDeal}
            />
          </Div>
          {op.id !== 0 &&
            <Div
              w='40px'
            >
              <DealLabour
                deal={deal}
                batch={batch}
                proc={proc}
                op={op}
                upsertDeal={upsertDeal}
              />
            </Div>
          }
          {/* {batch.id !== 0 &&
            <Div
              w='170px;'
              z='100'
            >
              <Prods
                notify={notify}
                deal={deal}
                batch={batch}
                upsertDeal={upsertDeal}
              />
            </Div>
          } */}
        </FlexContainer>
      {/* }
    </Mutation> */}
  </>
}