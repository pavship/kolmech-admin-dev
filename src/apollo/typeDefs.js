export default `
	type Details {
		type: String
		id: ID
		enquiryId: ID
		editMode: Boolean
		closing: Boolean
	}
	type Query {
    notifications: [Notification]!
	}
	type Notification {
		title: String
		content: String
  }
`