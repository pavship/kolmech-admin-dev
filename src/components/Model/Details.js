import React from 'react'

import { Div, Icon } from '../styled/styled-semantic'
import List from '../list/List'
import { listSchema } from '../../schema/employee'
import { modelLocal } from '../../graphql/model'

export default ({
  id,
  closeDetails
}) => {
  console.log('Model!')
  return <>
    <Div
      p='1em'
    >
      двыапрдлжыовпадлываоп
      {/* <List
        entity={emp}
        schema={listSchema}
      /> */}
    </Div>
  </>
}
