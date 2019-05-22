import gql from 'graphql-tag'
import { opTypeFragmentBasic } from './opType';

export const opFragmentBasic = gql`
	fragment OpFragmentBasic on Op {
		id
		dealLabor
		opType { ...OpTypeFragmentBasic }
	}
	${opTypeFragmentBasic}
`