import gql from 'graphql-tag'

export const procFragmentBasic = gql`
	fragment ProcFragmentBasic on Proc {
		id
		name
	}
`