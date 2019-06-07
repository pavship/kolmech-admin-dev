import React from 'react'

import styled from 'styled-components'

import Proc from'./Proc'
import { Ops } from './Op/Ops'

const Container = styled.div`
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

export default ({
  notify,
  deal,
  batch,
  opTypes,
  upsertDeal,
  upsertBatch
}) => {
  // TODO change id = 0 to cuid() with isNew = true
  // TODO temporarily restrict adding more than 1 techprocess
  return [
    ...batch.procs,
    { id: 0 }
  ].map(proc =>
    <Container
      key={proc.id}
    >
      <Proc
        deal={deal}
        batch={batch}
        proc={proc}
        upsertDeal={upsertDeal}
        upsertBatch={upsertBatch}
      />
      {proc.id !== 0 &&
        <Ops
          notify={notify}
          deal={deal}
          batch={batch}
          proc={proc}
          opTypes={opTypes}
          upsertDeal={upsertDeal}
          upsertBatch={upsertBatch}
        />
      }
    </Container>
  )
}