import gql from 'graphql-tag'
import { telFragment } from './tel'

export const personFragmentBasic = gql`
	fragment PersonFragmentBasic on Person {
		id
		fName
		lName
		mName
		amoName
	}
`

export const personContactsFragment = gql`
	fragment PersonContactsFragment on Person {
		...PersonFragmentBasic
		htmlNote
		tels { ...TelFragment }
		user {
			email
			confirmed
		}
	}
	${telFragment}
	${personFragmentBasic}
`

export const persons = gql`
	query Persons {
		persons { ...PersonFragmentBasic }
	}
	${personFragmentBasic}
`
