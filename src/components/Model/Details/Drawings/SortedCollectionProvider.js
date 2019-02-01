import React, { Component } from 'react'
import produce from 'immer'

export default class SortedCollectionProvider extends Component {
  sort = () => {
    const { collection, sortBy } = this.props
    return collection.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
  }
  state = {
    sortedCollection: this.sort()
  }
  move = ( oldIndex, newIndex ) => {
    this.setState(
      produce(draft => {
        const [ removed ] = draft.sortedCollection.splice(oldIndex, 1)
        draft.sortedCollection.splice(newIndex, 0, removed)
      })
    )
  }
  render() {
    console.log('> SortedCollectionProvider render')
    console.log('this.props.collection > ', this.props.collection)
    const { children } = this.props
    const { sortedCollection } = this.state
    return children({
      sortedCollection,
      move: this.move
    })
  }
}
