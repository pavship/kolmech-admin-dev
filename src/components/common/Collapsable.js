import React, { Fragment } from 'react'

const Collapsable = ({ trigger, children, expanded}) => {
  return (
    <Fragment>
        {trigger}
        {expanded && children}
      </Fragment>
  )
}

export default Collapsable
