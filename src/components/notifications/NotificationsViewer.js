import React from 'react'

import { Subscribe } from 'unstated'
import NotificationsProvider from './NotificationsProvider'
import Notifications from './Notifications'

export default () => {
  return (
		<Subscribe
			to={[NotificationsProvider]}
		>
			{notificationsProvider => {
				const { dismiss, state: { messages } } = notificationsProvider
				return (
					<Notifications
						messages={messages}
						dismissNotification={dismiss}
					/>
				)
			}}
		</Subscribe>
	)
}