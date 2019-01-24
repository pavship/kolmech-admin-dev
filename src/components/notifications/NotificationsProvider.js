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
    // notification will auto dismiss
    message.timerId = setTimeout(() => {
      this.dismiss(message.id)
    }, 5000)
    this.setState(({ messages }) => ({
      messages: [...cloneDeep(messages), message],
    }))
  }
  dismiss = messageId => {
    this.setState(({ messages }) => ({
      messages: messages.filter(m => m.id !== messageId)
    }))
  }
  cancelAutoDismiss = messageId => {
    const message = cloneDeep(this.state.messages.find(m => m.id === messageId))
    clearTimeout(message.timerId)
    delete message.timerId
    this.setState(({ messages }) => ({
      messages: [...messages.filter(m => m.id !== messageId), message]
    }))
  }
}