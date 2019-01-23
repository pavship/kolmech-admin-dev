import gql from 'graphql-tag'

// export const getNotifications = gql`
// 	query getLists {
// 		lists @client {
// 			notifications
// 		}
// 	}
// `

export const getNotifications = gql`
	{
		notifications @client {
			title
			content
		}
	}
`

// export const getNotificationsOptions = ({
// 	props: ({ data: { notifications } }) => {
// 		return { notifications }
// 	}
// })

// export const createNotification = gql`
// 	mutation CreateNotification(
// 		$title: String!
// 		$content: any
// 	) {
// 		createNotification(
// 			title: $title
// 			content: $content
// 		) @client {
// 			ok
// 		}
// 	}
// `