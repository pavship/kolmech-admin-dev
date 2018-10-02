import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import CollapsableCardSection from './CollapsableCardSection';
import DetailsHeader from './DetailsHeader';
import { CardSection } from './styled-semantic/styled-semantic';

export default class OrderDetails extends Component {
  state = {
    expanded: false
  } 
  render() {
    const { expanded } = this.state 
    return (
      <Fragment>
        <CollapsableCardSection 
          title='Shiiit'
        >
          hello!
          sdfgsd
          dsfgsdgfdsfgsd
          dsfg
        </CollapsableCardSection>
        <CardSection></CardSection>
        </Fragment>
    )
  }
}
