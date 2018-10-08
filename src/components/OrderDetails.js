import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Button } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import CollapsableSection from './CollapsableSection'

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
            title={model.name}
            subtitle={qty + 'шт'}
            buttons={
              <Button compact circular menu
                activeColor='green'
                icon='plus'
                content='Зарезервировать'
                active={extra}
                onClick={() => setExtra({
                  type: 'store',
                  modelId: model.id
                })}
              />
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
