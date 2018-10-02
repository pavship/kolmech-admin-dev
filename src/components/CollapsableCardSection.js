import React, { Component, Fragment } from 'react'
import DetailsHeader from './DetailsHeader'
import Collapsable from './common/Collapsable'
import { CardSection } from './styled-semantic/styled-semantic';

class CollapsableCardSection extends Component {
  state = {
    expanded: false
  }
  render() {
    const { expanded } = this.state
    const { title, children } = this.props
    return (
      <Fragment>
          <DetailsHeader
            expanded={expanded}
            title={title}
            onClick={() => this.setState({ expanded: !expanded})}
          />
          <CardSection>
            sdf
          {expanded &&
            children
          }
        </CardSection>
      </Fragment>
    )
  }
}

export default CollapsableCardSection
