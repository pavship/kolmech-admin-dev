import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { CardSection, NCardSection } from './styled-semantic/styled-semantic'

import DetailsHeader from './DetailsHeader'

const SCardSection = styled(NCardSection)`
  &&&& { padding: 0; }
`
const BCardSection = styled(NCardSection)`
  &&&& { padding: 0.5em 1em 1em 55px; }
`

class CollapsableCardSection extends Component {
  state = {
    expanded: false
  }
  render() {
    const { expanded } = this.state
    const { title, subtitle, children } = this.props
    return (
        <SCardSection
          topBorder
        >
          <DetailsHeader
            expanded={expanded}
            title={title}
            subtitle={subtitle}
            titleSize='small'
            onClick={() => this.setState({ expanded: !expanded})}
          />
            {expanded &&
              <BCardSection>
                {children}
              </BCardSection>
            }
        </SCardSection>
    )
  }
}

export default CollapsableCardSection
