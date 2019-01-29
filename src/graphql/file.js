import gql from 'graphql-tag'

export const fileFragmentBasic = gql`
	fragment FileFragmentBasic on File {
		id
		path
		size
		filename
		mimetype
		isOri
		width
		height
	}
`