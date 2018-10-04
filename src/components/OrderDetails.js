import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import CollapsableSection from './CollapsableSection'

export default class OrderDetails extends Component {
  render() {
    const { order: {
      id,
      model,
      qty
    } } = this.props
    return (
      <CollapsableSection
        title={model.name}
        subtitle={qty + 'шт'}
      >
        hello! 
        sdfgsd
        dsfgsdgfdsfgsd
        dsfg
      </CollapsableSection>
    )
  }
}
