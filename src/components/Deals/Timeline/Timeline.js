import React from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import Plot from './Plot'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 542px;
  /* width: calc(700px); */
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,rgba(240,241,242,1) 0%,rgba(200,201,202,1) 100%);
  z-index: -1;
`

export default function Timeline ({

}) {
  return <Container
    onClick={()=>console.log('container here!')}
  >
    <Plot />
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