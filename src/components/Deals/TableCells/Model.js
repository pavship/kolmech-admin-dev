import React, { useState, useEffect, useRef } from 'react'
import { Icon } from 'semantic-ui-react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic';

const Input = styled.input`
  width: 129px;
`

export default ({
  deal,
  batch,
  upsertDeal
}) => {
  const { id: batchId, qty, model = {} } = batch
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  const iniModelName = model.name || ''
  const [ modelName, setModelName ] = useState(iniModelName)
  if (editMode)
    return <Input
      ref={inputRef}
      placeholder='Новое Изделие'
      value={modelName}
      onChange={({ target: { value }}) => setModelName(value)}
      onBlur={async () => {
        if (modelName !== iniModelName && modelName !== '')
          await upsertDeal({ variables: { input: {
            id: deal.id,
            batches: [
              ...deal.batches.map(({ id }) => ({ id })).filter(b => b.id !== batchId),
              {
                id: batchId,
                ...(batchId === 0) && { qty: 0 },
                model: {
                  ...(model.id !== 0) && { id: model.id },
                  name: modelName,
                }
              }
            ]
          }}})
        // else setEditMode(false)
        setEditMode(false)
      }}
    />
  else if (batchId === 0)
    return <Icon
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
      to='ellipsis'
      onClick={() => setEditMode(true)}
    >
      {model.name}
    </Div>
}