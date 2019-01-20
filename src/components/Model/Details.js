import React from 'react'

import Drawings from './Details/Drawings'

export default ({
  model
}) => {
  return <>
    <Drawings
      drawings={model.drawings}
    />
  </>
}
