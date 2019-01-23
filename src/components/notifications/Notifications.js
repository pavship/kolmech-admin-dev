import React from "react"
import reactDom from 'react-dom'

import styled from 'styled-components'
import Notification from "./Notification"

const NotificationsHolder = styled.div`
	position: fixed;
  top: 0;
	left: 0;
  width: 100%;
  /* Height of 0 in order to allow events to propagate to the main part of the app. */
  z-index: 1;
`

export default ({
	messages
}) => {
  return reactDom.createPortal(
		<NotificationsHolder>
			{messages.map((m, i) =>
				<Notification
					message={m}
				/>
			)}
		</NotificationsHolder>,
		document.getElementById('kolmech-notifications')
	)
}