import React, { useState, useContext } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'

export default function ExecName ({
  exec,
  opIndex,
  upsertBatch
}) {
  const { setDetails } = useContext(DetailsContext)
  const { isNew: isNewExec, person } = exec
  const { name } = person || {}
  const [ addMode, setAddMode ] = useState(false)
  if (isNewExec)
    return <Icon
      ml='6px'
			c={addMode ? 'green' : 'rgba(50,50,50,.87)'}
      link
      name='plus'
      onClick={() => {
        setAddMode(true)
        setDetails({
          type: 'SelectExec',
          onSubmit: execId => {
            console.log('execId > ', execId)
            // upsertBatch(draft => {
            //   assignNested( draft,
            //     `draft.procs[0].ops[${opIndex}].execs[length]`,
            //     { id: execId }
            //   )
            // })
            // setAddMode(false)
          }
        })
      }}
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