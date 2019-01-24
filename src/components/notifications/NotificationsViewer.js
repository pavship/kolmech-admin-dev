import React from 'react'

import { Subscribe } from 'unstated'
import NotificationsProvider from './NotificationsProvider'
import Notifications from './Notifications'

export default () => {
  return (
		<Subscribe
			to={[NotificationsProvider]}
		>
			{({ state: { messages }}) =>
				messages.length
				? <Notifications
						messages={messages}
					/>
				: null
			}
		</Subscribe>
	)
}