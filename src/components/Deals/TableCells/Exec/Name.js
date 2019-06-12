import React, { useState, useContext } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'

export default function ExecName ({
  exec,
  opIndex,
  opTypeId,
  upsertBatch
}) {
  const { setDetails } = useContext(DetailsContext)
  const { isNew: isNewExec, person } = exec
  const { amoName } = person || {}
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
          opTypeId,
          onSubmit: execId => {
            console.log('execId > ', execId)
            upsertBatch(draft => {
              assignNested( draft,
                `procs[0].ops[${opIndex}].execs[length]`,
                { execId }
              )
            })
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
      {amoName}
    </Div>
}