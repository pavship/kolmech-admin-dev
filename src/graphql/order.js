import gql from 'graphql-tag'

export const upsertOrder = gql`
	mutation UpsertOrder($id: ID, $enquiryId: ID, $dateLocal: String!, $qty: Int, $amount: Float) {
		upsertOrder(id: $id, enquiryId: $enquiryId, dateLocal: $dateLocal, qty: $qty, amount: $amount) {
			id
			num
			dateLocal
			qty
			amount
			enquiry {
				id
			}
		}
	}
`
export const orderLocal = gql`
	query OrderLocal ($id: ID!) {
		orderLocal (id: $id) {
			num
			dateLocal
			qty
			amount
		}
	}
`
export const orderDetails = gql`
	query OrderDetails ($id: ID!) {
		order (id: $id) {
			id
			num
			dateLocal
			qty
			amount
			htmlNote
			org {
				id
				name
			}
			model {
				id
				name
			}
			events {
				id
				datetimeLocal
				htmlText
				type
				user {
					id
					person {
						id
						fName
						lName 
					}
				}
				status {
					id
					name
					stage 
				}
				doc {
					id
					dateLocal
					amount
				}
			}
		}
	}
`