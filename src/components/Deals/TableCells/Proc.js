import React, { useState, useEffect, useRef } from 'react'
import { Icon } from 'semantic-ui-react'

import { Div } from '../../styled/styled-semantic'
import HtmlInput from '../../common/HtmlInput'
import { assignNested } from '../../form/utils'

export default function Proc ({
  batch,
  proc,
  upsertBatch
}) {
  const { isNew: isNewProc} = proc
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  if (editMode)
    return <HtmlInput
      ref={inputRef}
      placeholder='Новый техпроцесс'
      value={proc.name || ''}
      onChange={value => {
        upsertBatch(draft => {
          assignNested(draft, 'procs[0].name', value)
          if (isNewProc) assignNested(draft, 'procs[0].modelId', batch.model.id, true)
        })
      }}
      onBlur={() => setEditMode(false)}
    />
  else if (isNewProc)
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
      {proc.name}
    </Div>
}