import React from 'react'
import cuid from 'cuid'

import styled from 'styled-components'

import { Op } from'./Op'

const Container = styled.div`
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
  background: rgba(0,0,0,.05);
`

export const Ops = ({
  notify,
  deal,
  batch,
  proc,
  opTypes,
  upsertDeal,
  upsertBatch
}) => {
  return [
    ...proc.ops,
    { id: cuid(), isNew: true }
  ].map(op =>
    <Container
      key={op.id}
    >
      <Op
        notify={notify}
        deal={deal}
        batch={batch}
        proc={proc}
        op={op}
        opTypes={opTypes}
        upsertDeal={upsertDeal}
        upsertBatch={upsertBatch}
      />
    </Container>
  )
}