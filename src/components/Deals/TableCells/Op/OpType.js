import React, { useState, useEffect, useRef, useContext } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import DealsContext from '../../context/DealsContext'
import HtmlSelect from '../../../common/HtmlSelect'
import { assignNested } from '../../../form/utils'

export default function OpType ({
  proc,
  op,
  upsertBatch
}) {
  const { id: opId, isNew: isNewOp, opType } = op
  const { id: opTypeId, name } = opType || {}
  // const { name } = opType || {}
  const { opTypes } = useContext(DealsContext)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  // const iniTypeId = (opType && opType.id) || 0
  // const [ opTypeId, setTypeId ] = useState(iniTypeId)
  const opsLength = proc.ops.length
  if (editMode)
                        ...proc.ops.map(({ id }) => ({ id })).filter(o => o.id !== opId),
                        {
                          ...isNewOp
                            ? { opTypeId: opTypeId, dealLabor: 0 }
                            : { id: opId }
                        }
                      ]
                    }
                  ]
    return <HtmlSelect
      ref={inputRef}
      value={opTypeId}
      onChange={opTypeId => upsertBatch(draft => {
        assignNested(draft, `procs[0].ops[${opsLength}]`, { opTypeId })
      })}
      options={opTypes}
    />
    // return <select
    //   ref={inputRef}
    //   value={opTypeId}
    //   onChange={({ target: { value }}) => setTypeId(value)}
    //   onBlur={() => upsertBatch(draft => {
    //     assignNested(draft, `procs[0].ops[${opsLength}]`, { opTypeId })
    //   })}
    // >
    //   {[{ id: 0, name: '' }, ...opTypes].map(({ id, name }) =>
    //     <option key={id} value={id}>{name}</option>
    //   )}
    // </select>
  else if (isNewOp)
    return <Icon
      ml='6px'
			// color='grey'
			c='rgba(50,50,50,.87)'
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
			to='ellipsis'
			pl='6px'
    >
      {name}
    </Div>
}