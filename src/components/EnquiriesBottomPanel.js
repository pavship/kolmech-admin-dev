import React from 'react'
import GlobalContext from './special/GlobalContext'

export default () => {
  return (
    <GlobalContext>
      {({ bottomPanel }) =>
        <div>
          <pre>{JSON.stringify(bottomPanel, null, 2)}</pre>
        </div>
      }
    </GlobalContext>
  )
}
