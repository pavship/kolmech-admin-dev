import gql from 'graphql-tag'

export const opTypeFragmentBasic = gql`
	fragment OpTypeFragmentBasic on OpType {
		id
		name
		opClass
	}
`