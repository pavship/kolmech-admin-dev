import React, { Component, Fragment } from 'react'
import DetailsHeader from './DetailsHeader'
import { Transition } from 'semantic-ui-react'
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
          >
          <CardSection>
            <Transition
              visible={expanded}
              unmountOnHide
              animation='slide down'
              duration={500}
            >
              <div>
                {children}
              </div>
            </Transition>
          </CardSection></DetailsHeader>
      </Fragment>
    )
  }
}

export default CollapsableCardSection
