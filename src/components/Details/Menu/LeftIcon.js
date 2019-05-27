import React from 'react'
import { Div } from '../../styled/styled-semantic'
import { Icon } from 'semantic-ui-react'

export default ({
  name,
  size,
  onClick
}) =>
  <Div
    w='55px'
    ta='center'
  >
    <Icon
      link
      size={size}
      name={name}
      onClick={onClick}
    />
  </Div>