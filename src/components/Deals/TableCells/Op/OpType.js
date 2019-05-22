import React, { useState, useEffect, useRef, useContext } from 'react'
import { Icon } from 'semantic-ui-react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic';
import DealsContext from '../../contexts/DealsContext';

const Select = styled.select`
  width: 130px;
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
  const { id: opId, opType } = op
  const { opTypes } = useContext(DealsContext)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  const iniTypeId = (opType && opType.id) || undefined
  const [ opTypeId, setTypeId ] = useState(iniTypeId)
  if (editMode)
    return <Select
        ref={inputRef}
        value={opTypeId}
        onChange={({ target: { value }}) => setTypeId(value)}
        onBlur={async () => {
          if (opTypeId !== iniTypeId && opTypeId !== undefined)
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
                          ...(opId === 0)
                            ? { opTypeId: opTypeId, dealLabor: 0 }
                            : { id: opId }
                        }
                      ]
                    }
                  ]
                }
              ]
            }}})
          setEditMode(false)
        }}
      >
        {opTypes.map(({ id, name }) =>
          <option key={id} value={id}>{name}</option>
        )}
      </Select>
  else if (opId === 0)
    return <Icon
      color='grey'
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
			to='ellipsis'
			pl='4px'
      // br='1px solid rgba(34,36,38,0.15);'
      // onClick={() => setEditMode(true)} //block editing
    >
      {op.opType.name}
    </Div>
}