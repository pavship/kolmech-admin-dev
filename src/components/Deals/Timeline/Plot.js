import React from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import Header from './Header'

const Container = styled.div`
  position: absolute;
  top: 0;
  /* top: 36px; */
  left: -700px;
  width: 2100px;
  /* height: calc(100% - 36px); */
  height: 100%;
  /* background: purple; */
`

export default function Plot ({

}) {
  return <Container
    onClick={()=>console.log('plot here!')}
  >
    <Header />
    {/* <Div
      w='130px'
      br={isNew ? undefined : '1px solid rgba(34,36,38,0.15);'}
    >
      <Model
        batch={batch}
        deal={deal}
        model={model}
        upsertDeal={upsertDeal}
      />
    </Div>
    {!isNew && <>
      <Div
        w='40px;'
      >
        <Qty
          deal={deal}
          batch={batch}
          upsertDeal={upsertDeal}
        />
      </Div>
      <Div
        w='calc(170px+140px)'
      >
        <ProcOps
          modelId={model.id}
          ops={ops}
          procs={procs}
          upsertBatch={upsertBatch}
        />
      </Div>
    </>} */}
  </Container>
}