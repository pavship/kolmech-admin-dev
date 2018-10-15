import React, { Component, Fragment } from 'react'

import { Mutation } from 'react-apollo'
import { reserveProds } from '../graphql/order'

import { Message } from 'semantic-ui-react'
import { Section, Button } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import CollapsableSection from './CollapsableSection'
import ProdsByDept from './ProdsByDept';
import DeptProdTable from './DeptProdTable';
import ReserveProdsButton from './ReserveProdsButton'
// import ListProvider from './special/ListProvider'
import ProdContext from './special/ProdContext'

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
              <Fragment>
                <ProdContext
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
                          indent='32px'
                          nameFieldWidth='200px'
                        />
                      }
                    </ProdsByDept>
                  }
                </ProdContext>
                <Section
                  // small
                  minor
                  head
                >
                  <Mutation
                    mutation={reserveProds}
                    variables={{
                      orderId: id,
                      prodIds: selectedProdIds
                    }}
                  >
                    {( reserveProds, { loading, error }) => 
                      <Fragment>
                        {error &&
                          <Message
                            error
                            header='Зарезервировать не удалось..'
                            content={error.message}
                          />
                        }
                        <Button
                          primary
                          compact
                          circular
                          menu
                          ml='0'
                          content='Зарезервировать'
                          icon='gavel'
                          loading={loading}
                          disabled={!selectedProdIds.length}
                          onClick={reserveProds}
                        />
                      </Fragment>
                    }
                  </Mutation>
                </Section>
              </Fragment>
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
