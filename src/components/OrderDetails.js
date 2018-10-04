import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import CollapsableCardSection from './CollapsableCardSection'

export default class OrderDetails extends Component {
  render() {
    const { order: {
      id,
      model,
      qty
    } } = this.props
    return (
      <CollapsableCardSection
        title={model.name}
        subtitle={qty + 'шт'}
      >
        hello! 
        sdfgsd
        dsfgsdgfdsfgsd
        dsfg
      </CollapsableCardSection>
    )
  }
}
