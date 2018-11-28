import React from 'react'
import GlobalContext from './special/GlobalContext'
import EmployeesMenu from './EmployeesMenu'

export default ({
  closePanel
}) => {
  return (
    <GlobalContext>
      {({ bottomPanel, setBottomPanel }) => <>
        <EmployeesMenu 
          closePanel={closePanel}
        />

        <div>
          <pre>{JSON.stringify(bottomPanel, null, 2)}</pre>
        </div>

      </>}
    </GlobalContext>
  )
}
