import React, { useContext } from 'react'
import cuid from 'cuid'

import styled from 'styled-components'

import Proc from'./Proc'
import { Ops } from './Op/Ops'
import { Op } from './Op/Op';
import { Div } from '../../styled/styled-semantic'
import { DealsContext } from '../context/Context'

const Container = styled(Div)`
  /* width: calc(170px + 170px + 260px); */
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

export default function ProcOps ({
  modelId,
  ops,
  procs,
  upsertBatch,
}) {
  const { budgetMode } = useContext(DealsContext)
  // temporarily limited to only 1 technical process per batch
  return <>
    {[ops[0] || { id: cuid(), isNew: true }]
      .map((op, i) =>
        <Container
          // w={`calc(170px + 170px + 90px${budgetMode ? ' + 670px' : ''})`}
          w={budgetMode ? '1100px' : '430px'}
          key={op.id}
        >
          <Op
            op={op}
            opClass='SURVEY'
            opIndex={i}
            upsertBatch={upsertBatch}
            budgetMode={budgetMode}
          />
        </Container>
      )}
    {[procs[0] || { id: cuid(), isNew: true }]
      .map(proc =>
        <Container
          w={budgetMode ? '1100px' : '430px'}
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
              budgetMode={budgetMode}
            />
          }
        </Container>
      )}
  </>
}