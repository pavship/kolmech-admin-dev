import React from 'react'
import cuid from 'cuid'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'
import styled from 'styled-components'
import Batch from'./Batch'
import Model from './Model'
import { Div } from '../../styled/styled-semantic'

const SortableItemContainer = styled(Div)`
  :hover {
    .dragHandle {
      opacity: 1 !important;
    }
  }
`

const SortableContainer = sortableContainer(({children}) => {return <div>{children}</div>})

const DragHandle = sortableHandle(() =>
  <Div
    className='dragHandle'
    w='32px'
    ml='-32px'
    o='0'
    c='rgba(0,0,0,.6)'
    fw='bold'
    ta='center'
    cur='move'
    tr='opacity 0.25s ease-in-out'
  >::</Div>
)

const SortableBatch = sortableElement(props => (
  <SortableItemContainer
    d='flex'
    z='99'
  >
    <DragHandle />
    <Batch {...props} />
  </SortableItemContainer>
))

export default function Batches ({
  deal,
  upsertDeal
}) {
  const { id: dealId, batches } = deal
  return <>
    <SortableContainer
      onSortEnd={({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return
        upsertDeal({ variables: { input: {
          id: dealId,
          batches: [
            ...batches
              .filter(b => ![oldIndex, newIndex].includes(b.sort))
              .map(({ id }) => ({ id })),
            {
              id: batches.find(b => b.sort === oldIndex).id,
              sort: newIndex
            },
            {
              id: batches.find(b => b.sort === newIndex).id,
              sort: oldIndex
            }
          ]
        }}})
      }}
      useDragHandle
    >
      {deal.batches
        .map((batch, index) =>
          <SortableBatch
            key={batch.id}
            index={index}
            deal={deal}
            batch={batch}
            upsertDeal={upsertDeal}
          />)
      }
    </SortableContainer>
    <Model
      key={cuid()}
      batch={{isNew: true}}
      deal={deal}
      upsertDeal={upsertDeal}
    />
  </>
}