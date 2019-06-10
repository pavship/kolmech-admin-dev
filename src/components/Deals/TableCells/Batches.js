import React from 'react'
import styled from 'styled-components'

import Batch from'./Batch'

const Container = styled.div`
  width: calc(170px + 170px);
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

export default function Batches ({
  deal,
  upsertDeal
}) {
  return [
    ...deal.batches,
    { id: 0 }
  ].map(batch =>
    <Container
      key={batch.id}
    >
      <Batch
        deal={deal}
        batch={batch}
        upsertDeal={upsertDeal}
      />
    </Container>
  )
}