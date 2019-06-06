import gql from 'graphql-tag'
import { opTypeFragmentBasic } from './opType';

export const opFragmentBasic = gql`
	fragment opFragmentBasic on Op {
		id
		dealLabor
		opType { ...OpTypeFragmentBasic }
	}
	${opTypeFragmentBasic}
`

export const opFragmentMiddle = gql`
	fragment opFragmentMiddle on Op {
		...opFragmentBasic
		description
	}
	${opFragmentBasic}
	${opTypeFragmentBasic}
`
