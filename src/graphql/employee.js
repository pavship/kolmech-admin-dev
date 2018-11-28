import gql from 'graphql-tag'
import { personContactsFragment } from './person'

// export const org = gql`
// 	query org ($id: ID!) {
// 		org (id: $id) {
// 			id
// 			inn
// 			name
// 		}
// 	}
// `

export const orgEmployees = gql`
	query OrgEmployees ($orgId: ID!) {
		orgEmployees (orgId: $orgId) {
			id
			position
			person { ...PersonContactsFragment }
		}
	}
	${personContactsFragment}
`


// export const allOrgs = gql`
// 	query allOrgs {
// 		orgs {
// 			id
// 			inn
// 			name
// 		}
// 	}
// `

export const upsertEmployee = gql`
	mutation upsertEmployee(
		$input: EmployeeInput!
	) {
		upsertEmployee(
			input: $input
		) {
			id
		}
	}
`

// export const orgLocal = gql`
// 	query OrgLocal ($id: ID!) {
// 		orgLocal (id: $id) {
// 			id
// 			name
// 		}
// 	}
// `