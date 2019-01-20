import React, { Fragment } from 'react'

import CollapsableSection from '../../CollapsableSection'

export default ({
  drawings
}) => {
  return (
    <CollapsableSection
      title='Чертежи'
      subtitle={drawings ? drawings.length : ''}
      // TODO add addDrawing button
      // buttons={
      //   <ReserveProdsButton
      //     modelId={model.id}
      //     orderId={id}
      //     prodIds={prods.map(p => p.id)}
      //   />
      // }
    >
      lkdfjlkfdgj
    </CollapsableSection>
  )
}
