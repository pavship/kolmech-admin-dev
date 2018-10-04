import React, { Component } from 'react'

import styled from 'styled-components'
import { Section } from './styled-semantic/styled-semantic'

import DetailsHeader from './DetailsHeader'

const OuterSection = styled(Section)`
  &&&& { 
    padding: 0;
    ${props => props.expanded && `{
      margin-top: -1px;
      border-bottom-color: rgba(34, 36, 38, 0.15);
    }`}
  }
`

class CollapsableSection extends Component {
  state = {
    expanded: false
  }
  render() {
    const { expanded } = this.state
    const { title, subtitle, children } = this.props
    return (
      <OuterSection
        expanded={expanded ? 1 : 0}
        topBorder={expanded}
        bottomBorder={expanded}
      >
        <DetailsHeader
          expanded={expanded}
          title={title}
          subtitle={subtitle}
          titleSize='small'
          onClick={() => this.setState({ expanded: !expanded})}
        />
          {expanded &&
            <Section>
              {children}
            </Section>
          }
      </OuterSection>
    )
  }
}

export default CollapsableSection
