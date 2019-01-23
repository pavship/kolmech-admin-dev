import React from "react"
// import GlobalNotifications from "./GlobalNotifications"
import Notifications from "./Notifications"
import { Query } from 'react-apollo';
import { getNotifications } from "../../graphql/notifications";

export default () => {
  return (
		<Query
			query={getNotifications}
		>
			{({ data: { notifications } }) =>
				console.log('notifications > ', notifications) || (notifications.length && 
					<Notifications
						messages={notifications}
					/>)
			}
		</Query>
	)
}