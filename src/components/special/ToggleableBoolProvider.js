import React from 'react'
import { Container } from 'unstated'

export default class ToggleableBoolProvider extends Container {
  state = {
    bool: false
  }
  toggle = () => {
    this.setState(({ bool }) => ({
      bool: !bool
    }))
  }
  enable = () => this.setState({ bool: true })
  disable = () => this.setState({ bool: false })
}