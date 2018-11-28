import gql from 'graphql-tag'

export const telFragment = gql`
	fragment TelFragment on Tel {
		id
		number
		type
		note
		default
	}
`