import React from 'react'

import { Div, Icon } from '../styled/styled-semantic';
import DetailsHeader from '../DetailsHeader'
import Employee from './Employee'

export default ({
  emp,
  toggleEditMode
}) => {
  return <>
    <DetailsHeader
      title={emp.person.fullname}
      size='small'
      noIndent
      bottomBorder='dark'
      buttons={<>
        <Icon
          link
          name='edit'
          activeColor='blue'
          onClick={toggleEditMode}
        />
      </>}
    />
    <Div
      p='1em'
    >
      <Employee
        emp={emp}
      />
    </Div>
  </>
}
