import React from 'react'

import styled from 'styled-components'

import Op from'./Op'

const Container = styled.div`
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
  background: rgba(0,0,0,.05);
`

export default ({
  notify,
  deal,
  batch,
  proc,
  opTypes,
  upsertDeal
}) => {
  return [
    ...proc.ops,
    { id: 0 }
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
      />
    </Container>
  )
}