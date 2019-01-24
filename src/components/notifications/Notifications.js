import React from "react"
import reactDom from 'react-dom'

import styled from 'styled-components'
import posed from 'react-pose'
import Notification from "./Notification"

// const NotificationsHolder = styled(posed.ul({
//   open: { x: '0%' },
//   closed: { x: '-100%' }
// }))`
// 	position: fixed;
//   bottom: 0;
// 	left: 0;
//   width: 100%;
//   // Height of 0 in order to allow events to propagate to the main part of the app.
//   z-index: 1;
// `

const NotificationsHolder = styled.div`
	position: fixed;
  bottom: 0;
	left: 0;
  width: 100%;
  z-index: 1;
`

const PosedList = styled(posed.ul({
  open: { x: '0%' },
  closed: { x: '-100%' }
}))`
	list-style: none;
	margin: 0;
	padding: 0;
`

const PosedItem = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

export default ({
	messages
}) => {
  return reactDom.createPortal(
		<NotificationsHolder>
		<PosedList
			pose={messages.length ? 'open' : 'closed'}
		>
			{messages.map((m, i) =>
				<PosedItem
					key={i}
				>
					<Notification
						message={m}
					/>
				</PosedItem>
			)}
		</PosedList>,
		</NotificationsHolder>,
		document.getElementById('kolmech-notifications')
	)
}