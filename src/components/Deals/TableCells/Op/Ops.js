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
  deal,
  batch,
  proc,
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
        deal={deal}
        batch={batch}
        proc={proc}
        op={op}
        upsertDeal={upsertDeal}
        upsertBatch={upsertBatch}
      />
    </Container>
  )
}