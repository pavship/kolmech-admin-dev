import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Button } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import CollapsableSection from './CollapsableSection'

const IconRight = styled(Icon)`
  &&&& { margin: 0 -.42857143em 0 .42857143em; }
`

export default class OrderDetails extends Component {
  render() {
    const { order: {
      id,
      model,
      qty
    } } = this.props
    return (
      <GlobalContext>
        {({ extra, setExtra }) => (
          <CollapsableSection
            forceExpanded={!!extra}
            title={model.name}
            subtitle={qty + 'шт'}
            buttons={
              <Button compact circular menu
                activeColor='green'
                active={!!extra}
                onClick={(e) => {
                  e.stopPropagation()
                  setExtra({
                    type: 'store',
                    modelId: model.id
                  })
                }}
              >
                Зарезервировать
                 <IconRight name='angle right' />
              </Button>
            }
          >
            hello! 
            sdfgsd
            dsfgsdgfdsfgsd
            dsfg
          </CollapsableSection>
        )}
      </GlobalContext>
    )
  }
}
