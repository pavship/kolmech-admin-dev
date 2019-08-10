import React from 'react'
import cuid from 'cuid'
import { assignNested } from '../../../form/utils'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import NewElement from './NewElement'
import Element from './Element';

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

const SortableElement = sortableElement(props => (
  <SortableItemContainer
    d='flex'
    z='99'
  >
    <DragHandle />
    <Element {...props} />
  </SortableItemContainer>
))

export default function Elements ({
  elements,
  upsertBatch,
  modelId,
  budgetMode,
}) {
  return <>
    <SortableContainer
      onSortEnd={({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return
        upsertBatch(draft => {
          assignNested(draft, `elements[id=${elements[oldIndex].id}]`, { sort: newIndex })
          assignNested(draft, `elements[id=${elements[newIndex].id}]`, { sort: oldIndex }, true)
        })
      }}
      useDragHandle
    >
      {elements.map((element, index) =>
        <SortableElement
          key={element.id}
          index={index}
          element={element}
          upsertBatch={upsertBatch}
          deleteElement={() => upsertBatch(draft => {
            assignNested(draft, `elements[id=${element.id}]`, {})
          })}
          budgetMode={budgetMode}
        />
      )}
    </SortableContainer>
    <Div
      w='170px'
    >
      <NewElement
        key={cuid()}
        modelId={modelId}
        opClass='SURVEY'
        upsertBatch={upsertBatch}
        newElementIndex={elements.length}
      />
    </Div>
  </>
}