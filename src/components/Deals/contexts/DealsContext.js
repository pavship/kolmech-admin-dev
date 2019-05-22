import React from 'react'

const DealsContext = React.createContext()
export default DealsContext

export const ContextProvider = ({
  children,
  opTypes
}) => {
  return (
    <DealsContext.Provider
      value={{
        opTypes
      }}
    >
      {children}
    </DealsContext.Provider>
  )
}