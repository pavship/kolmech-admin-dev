import React from 'react'
import { Container } from 'unstated'

export default class SelectableListProvider extends Container {
  state = {
    list: []
  }
  select = item => {
    this.setState(({ list }) => ({
      list: list.includes(item)
			? [ ...list.filter(i => i !== item) ]
			: [ ...list, item ]
    }))
  }
  deselectAll = () => this.setState({ list: [] })
}