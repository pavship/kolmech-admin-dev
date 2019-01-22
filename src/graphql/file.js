import gql from 'graphql-tag'

export const fileFragmentBasic = gql`
	fragment FileFragmentBasic on File {
		id
		filename
		mimetype
		path
	}
`