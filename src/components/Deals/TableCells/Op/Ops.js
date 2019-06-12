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
  ops,
  upsertBatch
}) => {
  return [
    ...ops,
    { id: cuid(), isNew: true }
  ].map((op, i) =>
    <Container
      key={op.id}
    >
      <Op
        op={op}
        opIndex={i}
        upsertBatch={upsertBatch}
      />
    </Container>
  )
}