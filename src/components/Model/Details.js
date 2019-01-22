import React from 'react'

import Drawings from './Details/Drawings'

export default ({
  model
}) => {
  return <>
    <Drawings
      modelId={model.id}
      drawings={model.drawings}
    />
  </>
}
