import React from 'react'

import NotificationsContext from './NotificationsContext'
import Notifications from './Notifications'

export default function NotificationsViewer () {
  return (
		<NotificationsContext.Consumer>
			{({
				state: { messages },
				dismiss,
				cancelAutoDismiss,
			}) =>
				<Notifications
					messages={messages}
					dismissNotification={dismiss}
					cancelAutoDismiss={cancelAutoDismiss}
				/>
			}
		</NotificationsContext.Consumer>
	)
}