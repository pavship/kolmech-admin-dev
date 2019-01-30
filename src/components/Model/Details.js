import React from 'react'

import Drawings from './Details/Drawings'

export default ({
  model
}) => {
  return <>
    <Drawings
      model={model}
      modelId={model.id}
      drawings={model.drawings}
    />
  </>
}
