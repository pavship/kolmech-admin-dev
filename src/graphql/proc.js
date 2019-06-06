import gql from 'graphql-tag'
import { opFragmentBasic, opFragmentMiddle } from './op';

export const procFragmentBasic = gql`
	fragment procFragmentBasic on Proc {
		id
		name
		ops { ...opFragmentBasic }
	}
	${opFragmentBasic}
`

export const procFragmentMiddle = gql`
	fragment procFragmentMiddle on Proc {
		...procFragmentBasic
		ops { ...opFragmentMiddle }
	}
	${procFragmentBasic}
	${opFragmentMiddle}
`