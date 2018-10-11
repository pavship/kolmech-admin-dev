import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Button } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import CollapsableSection from './CollapsableSection'
import ProdsByDept from './ProdsByDept';
import DeptProdTable from './DeptProdTable';

const IconRight = styled(Icon)`
  &&&& { margin: 0 -.42857143em 0 .42857143em; }
`

export default class OrderDetails extends Component {
  render() {
    const { order: { id, model, qty, prods } } = this.props
    return (
      <GlobalContext>
        {({ extra, setExtra, selectedProdIds, setSelectedProdIds }) => (
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
                    type: 'Store',
                    modelId: model.id,
                    orderId: id
                  })
                }}
              >
                Зарезервировать
                 <IconRight name='angle right' />
              </Button>
            }
          >
            <ProdsByDept
              prods={prods}
              selectedIds={selectedProdIds}
              orderProdsQty={qty}
            >
              {({ depts }) =>
                <DeptProdTable
                  depts={depts}
                  setSelectedProdIds={setSelectedProdIds}
                  skipFields={['reserve']}
                />
              }
            </ProdsByDept>
          </CollapsableSection>
        )}
      </GlobalContext>
    )
  }
}
