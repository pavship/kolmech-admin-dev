import React, { Component } from 'react'
import { compose, graphql, Query } from 'react-apollo'
// import { getNotifications, getNotificationsOptions, createNotification } from '../../graphql/notifications'
import { getNotifications } from '../../graphql/notifications'
import { cloneDeep } from 'apollo-utilities';

// class GlobalContextProvider extends Component {
// 	// setDetails = (details) => {
// 	// 	this.props.setLayout({variables: { details }})
// 	// }
// 	render() {
// 		const { children, getLayout: { details }, setLayout } = this.props
// 		return (
// 			<GlobalContext.Provider 
// 				value={{
// 					details,
// 					setDetails: (details) => setLayout({variables: { details }})
// 				}}
// 			>
// 				{children}
// 			</GlobalContext.Provider>
// 		)
// 	}
// }

// const GlobalNotifications = ({
export default ({
		children,
		// notifications,
		// createNotification
}) => {
	return (
		<Query
			query={getNotifications}
		>
			{({ data: { notifications }, client }) =>
				children({
					notifications,
					// createNotification: (message) => console.log('notifications > ', notifications) || client.writeData({ data: { notifications: [...notifications, message] } }),
					createNotification: async (message) => console.log('notifications > ', notifications) || await client.writeData({ data: { notifications: [...notifications, { title: 'pussy'}] } }),
				})
			}
		</Query>
	)

  // return children({
	// 	notifications,
	// 	createNotification: (details) => setLayout({ variables: { input: { details, extra: null } }}),
	// 	setExtra: (extra) => setLayout({ variables: { input: { extra } } }),
	// 	setBottomPanel: (bottomPanel) => setLayout({ variables: { input: { bottomPanel } } }),
	// 	setExpanded: (args) => setExpanded({variables: { args }}),
	// 	selectedProdIds,
	// 	setSelectedProdIds: (value) => 
	// 		setList({variables: { name: 'selectedProdIds', value }}),
	// })
}

// export default compose(
// 	graphql(getNotifications, getNotificationsOptions),
// 	graphql(createNotification, { name: 'createNotification' }),
// )(GlobalNotifications)