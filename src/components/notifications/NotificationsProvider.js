import React from 'react'
import cuid from 'cuid'
import { Container } from 'unstated'
import { cloneDeep } from 'apollo-utilities'

export default class NotificationsProvider extends Container {
  state = {
    messages: []
  }
  create = message => {
    message.id = cuid()
    this.setState(({ messages }) => ({
      messages: [...cloneDeep(messages), message]
    }))
  }
  dismiss = messageId => {
    this.setState(({ messages }) => ({
      messages: messages.filter(m => m.id !== messageId)
    }))
  }
}