import React, { Component } from 'react'

import styled from 'styled-components'
import CollapsableCardSection from './CollapsableCardSection';
import DetailsHeader from './DetailsHeader';

export default class OrderDetails extends Component {
  state = {
    expanded: false
  } 
  render() {
    const { expanded } = this.state 
    return (
      <CollapsableCardSection 
        title='Shiiit'
      >
        hello!
      </CollapsableCardSection>
      // <div>
      //   <DetailsHeader
      //     expanded={1}
      //     title={'Shiiit'}
      //   />
      // </div>
    )
  }
}
