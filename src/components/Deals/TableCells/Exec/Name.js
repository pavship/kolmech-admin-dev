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
  const { isNew: isNewExec, person: { amoName } = {} } = exec
  const [ addMode, setAddMode ] = useState(false)
  if (isNewExec)
    return <Icon
      ml='6px'
      // TODO fix addMode not recognized as truthy
			c={addMode ? 'green' : 'rgba(50,50,50,.87)'}
      link
      name='plus'
      activeColor='green'
      // active={addMode}
      onClick={() => {
        setAddMode(true)
        setDetails({
          type: 'SelectExec',
          opTypeId,
          onSubmit: execId => {
            upsertBatch(draft => {
              assignNested( draft,
                `procs[0].ops[${opIndex}].execs[length]`,
                { execId }
              )
            })
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