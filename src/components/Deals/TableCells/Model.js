import React, { useState, useEffect, useRef } from 'react'

import { Div, Icon } from '../../styled/styled-semantic'
import HtmlInput from '../../common/HtmlInput'
import useUpsert from '../../hooks/useUpsert';
import { assignNested } from '../../form/utils';

export default ({
  deal,
  batch: { id: batchId, isNew: isNewBatch},
  model: { id, name } = {},
  // upsertDeal
}) => {
  const { id: dealId, batches } = deal
  const [ upsertDeal ] = useUpsert('deal', deal)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  if (editMode)
    return <HtmlInput
      ref={inputRef}
      placeholder='Новое Изделие'
      value={name || ''}
      // onChange={value => value !== '' && upsertDeal({ variables: { input: {
      //   id: dealId,
      //   batches: [
      //     ...batches.map(({ id }) => ({ id })).filter(b => b.id !== batchId),
      //     {
      //       ...isNewBatch
      //         ? { qty: 1, sort: batches.length }
      //         : { id: batchId },
      //       model: {
      //         ...!isNewBatch && { id },
      //         name: value,
      //       }
      //     }
      //   ]
      // }}})}
      onChange={value => value !== '' && upsertDeal(draft =>
        assignNested(draft,
          isNewBatch
            ? 'batches[length]'
            : `batches[id=${batchId}].model`,
          isNewBatch
            ? { qty: 1, sort: batches.length, model: { name: value } }
            : { name: value }
        )
      )}
      onBlur={() => setEditMode(false)}
    />
  else if (isNewBatch)
    return <Icon
      link
      name='plus'
      // c='rgba(50,50,50,.87)'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
      to='ellipsis'
      fw='bold'
      onClick={() => setEditMode(true)}
    >
      {name}
    </Div>
}