import gql from 'graphql-tag'

export const allEnquiries = gql`
	query AllEnquiries {
		enquiries {
			id
			num
			dateLocal
            htmlNote
			org {
				id
				name }	
			events ( where: { status: { id_not: null } }, last: 1 ) {
				id
				status {
					id
					name
					stage } } } } `
export const enquiryDetails = gql`
	query EnquiryDetails ($id: ID!) {
		enquiry (id: $id) {
			id
			num
			dateLocal
            htmlNote
			org {
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
			}
		}
		statuses {
			id
			stage
			name
			prev {
				id
			}
			next {
				id
			}
		}
	}
`
export const newEnquiry = gql`
	query {
		newEnquiry @client {
			id
		}
        statuses {
			id
			stage
			name
			prev {
				id
			}
			next {
				id
			}
		}
	}
`
export const createEnquiry = gql`
	mutation createEnquiry($dateLocal: String!, $orgId: ID!) {
		createEnquiry(dateLocal: $dateLocal, orgId: $orgId) {
			id
			num
			dateLocal
            htmlNote
			org {
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
			}
		}
	}
`
export const updateEnquiry = gql`
	mutation UpdateEnquiry($input: EnquiryInput!) {
		updateEnquiry(input: $input) {
			id
			num
			dateLocal
            htmlNote
			org {
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
			}
		}
	}
`

export const createEnquiryEvent = gql`
	mutation CreateEnquiryEvent($enquiryId: ID!, $htmlText: String, $statusId: ID) {
		createEnquiryEvent(enquiryId: $enquiryId, htmlText: $htmlText, statusId: $statusId) {
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
		}
	}
`

export const enquiryFragment = gql`
	fragment myEnquiry on Enquiry {
		id
		num
		dateLocal
        htmlNote
		org {
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
		}
	}
`


// export const alteredEnquiry = gql`
//     query AlteredEnquiry($id: ID!) {
//         alteredEnquiry(id: $id) @client
//     }
// `

// export const updateAlteredEnquiry = gql`
//     mutation UpdateAlteredEnquiry($key: String!, $value: String!) {
//         updateAlteredEnquiry(key: $key, value: $value) @client
//     }
// `