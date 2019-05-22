import gql from 'graphql-tag'
import { opFragmentBasic } from './op';

export const procFragmentBasic = gql`
	fragment ProcFragmentBasic on Proc {
		id
		name
		ops { ...OpFragmentBasic }
	}
	${opFragmentBasic}
`