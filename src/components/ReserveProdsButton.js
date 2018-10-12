import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Button } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'

const IconRight = styled(Icon)`
  &&&& { margin: 0 -.42857143em 0 .42857143em; }
`

const ReserveProdsButton = ({ modelId, orderId }) => {
  return (
    <GlobalContext>
      {({ extra, setExtra }) => (
        <Button compact circular menu
          activeColor='green'
          active={!!extra}
          onClick={(e) => {
            e.stopPropagation()
            setExtra({
              type: 'Store',
              modelId,
              orderId
            })
          }}
        >
          Зарезервировать
            <IconRight name='angle right' />
        </Button>
      )}
    </GlobalContext>
  )
}

export default ReserveProdsButton