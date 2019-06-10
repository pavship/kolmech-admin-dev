import React from 'react'
import cuid from 'cuid'

import styled from 'styled-components'

import Proc from'./Proc'
import { Ops } from './Op/Ops'

const Container = styled.div`
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

export default ({
  deal,
  batch,
  upsertDeal,
  upsertBatch
}) => {
  // TODO change id = 0 to cuid() with isNew = true
  // TODO temporarily restrict adding more than 1 techprocess
  return [
    ...batch.procs,
    { id: cuid(), isNew: true }
  ].map(proc =>
    <Container
      key={proc.id}
    >
      <Proc
        batch={batch}
        proc={proc}
        upsertBatch={upsertBatch}
      />
      {!proc.isNew &&
        <Ops
          deal={deal}
          batch={batch}
          proc={proc}
          upsertDeal={upsertDeal}
          upsertBatch={upsertBatch}
        />
      }
    </Container>
  )
}