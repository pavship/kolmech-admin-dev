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

export default function ProcOps ({
  modelId,
  ops,
  procs,
  upsertBatch
}) {
  // TODO temporarily restrict adding more than 1 techprocess
  return [
    ...procs,
    { id: cuid(), isNew: true }
  ].map(proc =>
    <Container
      key={proc.id}
    >
      <Proc
        modelId={modelId}
        proc={proc}
        upsertBatch={upsertBatch}
      />
      {!proc.isNew &&
        <Ops
          ops={proc.ops}
          upsertBatch={upsertBatch}
        />
      }
    </Container>
  )
}