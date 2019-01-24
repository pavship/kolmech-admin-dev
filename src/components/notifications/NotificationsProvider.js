import React from 'react'
import { Container } from 'unstated'
import { cloneDeep } from 'apollo-utilities';

export default class NotificationsContainer extends Container {
  state = {
    messages: []
  }
  create(message) {
    console.log('message > ', message)
    this.setState(({ messages }) => ({
      messages: [...cloneDeep(messages), message]
    }))
    console.log('this.state.messages > ', this.state.messages)
  }
}