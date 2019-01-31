import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import Drawing from './Drawing'

export default SortableContainer(({
  sortedDrawings,
  selectDrawing,
  selectedDrawings,
  sortMode
}) => {
  return (
    <div>
      {sortedDrawings.map((drw, i) =>
        <Drawing
          key={drw.id}
          index={i}
          drawing={drw}
          select={selectDrawing}
          selected={!!selectedDrawings.includes(drw.id)}
          selectMode={!!selectedDrawings.length}
          sortMode={sortMode}
          disabled={!sortMode}
        />
      )}
    </div>
  )
})

