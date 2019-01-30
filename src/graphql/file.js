import gql from 'graphql-tag'

export const fileFragmentFull = gql`
	fragment FileFragmentFull on File {
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