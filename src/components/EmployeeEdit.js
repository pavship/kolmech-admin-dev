import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { Icon } from 'semantic-ui-react'
import DetailsHeader from './DetailsHeader'
import EmployeeForm from './EmployeeForm'
import { Div } from './styled-semantic/styled-semantic'

export default class EmployeeEdit extends Component {
  render() {
    const { 
      emp,
      orgId
    } = this.props
    // existing emp
    const { fName, lName, mName } = emp || {}
    const fullname = [fName, lName, mName].join(' ')
    return <>
      <DetailsHeader
        title={
          emp
          ? 'Редактирование'
          : 'Добавление представителя'
        }
        size='small'
        noIndent
        bottomBorder='dark'
        buttons={<>
          {/* <Icon
            link
            name='save'
            color='blue'
            onClick={(emp) => console.log('upsert emp -> ', emp)}
          /> */}
        </>}
      />
      <Div
        p='1em'
      >
        <EmployeeForm
          emp={emp}
          orgId={orgId}
        />
      </Div>
    </>
  }
}
