import React, { Component, Fragment } from 'react'

import GlobalContext from './special/GlobalContext'
import CollapsableSection from './CollapsableSection'
import ProdsByDept from './ProdsByDept';
import DeptProdTable from './DeptProdTable';
import ReserveProdsButton from './ReserveProdsButton'
import ListProvider from './special/ListProvider'
import ProdDataProvider from './special/ProdDataProvider'

export default class ModelProdsSection extends Component {
  render() {
    const { order: { id, model, qty, prods } } = this.props
    return (
      <GlobalContext>
        {({ extra, selectedProdIds }) => (
          <CollapsableSection
            forceExpanded={!!extra}
            title={model.name}
            subtitle={qty + 'шт'}
            buttons={
              <ReserveProdsButton
                modelId={model.id}
                orderId={id}
              />
            }
          >
            {extra && 
              <ProdDataProvider
                ids={selectedProdIds}
              >
                {({ prodsLocal: selectedProds }) =>
                  <ProdsByDept
                    prods={prods}
                    selectedProds={selectedProds}
                    orderProdsQty={qty}
                    expanded
                  >
                    {({ depts }) =>
                      <DeptProdTable
                        depts={depts}
                        skipFields={['reserve']}
                        expand={() => null}
                      />
                    }
                  </ProdsByDept>
                }
              </ProdDataProvider>
            }
            {/* {!extra && 
              <ListProvider>
                {({ list: selectedIds, setList: setSelectedProdIds}) =>
                  <ProdsByDept
                    prods={prods}
                    selectedIds={selectedIds}
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
                }
              </ListProvider>
            } */}
          </CollapsableSection>
        )}
      </GlobalContext>
    )
  }
}
