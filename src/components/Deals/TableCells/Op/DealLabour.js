import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'

const Input = styled.input`
  width: 40px;
`

export default ({
  deal,
  batch,
  proc,
  op,
  upsertDeal,
}) => {
  const { id: batchId } = batch
  const { id: procId} = proc
  const { id: opId, dealLabor: iniVal } = op
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  const [ val, setVal ] = useState(iniVal)
  return editMode
  ? <Input
      ref={inputRef}
      placeholder='0'
      value={val}
      onChange={({ target: { value }}) => setVal(value)}
      onBlur={async () => {
        if (val !== iniVal)
          await upsertDeal({ variables: { input: {
            id: deal.id,
            batches: [
              ...deal.batches.map(({ id }) => ({ id })).filter(b => b.id !== batchId),
              {
                id: batchId,
                procs: [
                  ...batch.procs.map(({ id }) => ({ id })).filter(p => p.id !== procId),
                  {
                    id: procId,
                    ops: [
                      ...proc.ops.map(({ id }) => ({ id })).filter(o => o.id !== opId),
                      {
                        id: opId,
                        dealLabor: val
                      }
                    ]
                  }
                ]
              }
            ]
          }}})
        setEditMode(false)
      }}
    />
  : <Div
      pl='4px'
      onClick={() => setEditMode(true)}
    >
      {val}ч
    </Div>
}