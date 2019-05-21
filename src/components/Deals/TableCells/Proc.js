import React, { useState, useEffect, useRef } from 'react'
import { Icon } from 'semantic-ui-react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic';

const Input = styled.input`
  width: 170px;
`

export default ({
  notify,
  deal,
  batch,
  proc,
  upsertDeal,
}) => {
  const { id: procId} = proc
  const { id: batchId, model: { id: modelId } } = batch
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  const iniName = proc.name || ''
  const [ name, setName ] = useState(iniName)
  if (editMode)
    return <Input
      ref={inputRef}
      placeholder='Новый техпроцесс'
      value={name}
      onChange={({ target: { value }}) => setName(value)}
      onBlur={async () => {
        if (name !== iniName && name !== '')
          await upsertDeal({ variables: { input: {
            id: deal.id,
            batches: [
              ...deal.batches.map(({ id }) => ({ id })).filter(b => b.id !== batchId),
              {
                id: batchId,
                procs: [
                  ...batch.procs.map(({ id }) => ({ id })).filter(p => p.id !== procId),
                  {
                    ...(procId !== 0)
                      ? { id: procId }
                      : { modelId },
                    name
                  }
                ]
              }
            ]
          }}})
        setEditMode(false)
      }}
    />
  else if (procId === 0)
    return <Icon
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
      to='ellipsis'
      // br='1px solid rgba(34,36,38,0.15);'
      onClick={() => setEditMode(true)}
    >
      {proc.name}
    </Div>
}