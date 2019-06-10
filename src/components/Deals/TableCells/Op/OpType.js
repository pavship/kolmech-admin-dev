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
  const { isNew: isNewOp, opType } = op
  const { id: opTypeId, name } = opType || {}
  const { opTypes } = useContext(DealsContext)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  const opsLength = proc.ops.length
  if (editMode)
    return <HtmlSelect
      ref={inputRef}
      value={opTypeId}
      onChange={opTypeId => upsertBatch(draft => {
        assignNested(draft, `procs[0].ops[${opsLength}]`, { opTypeId })
      })}
      options={opTypes}
    />
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