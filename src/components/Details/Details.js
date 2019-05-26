import React, { useState } from 'react'
import Menu from './Menu';

export default ({
  details,
  setDetails
}) => {
  return <>
    <Menu
      setDetails={setDetails}
    />
  </>
}