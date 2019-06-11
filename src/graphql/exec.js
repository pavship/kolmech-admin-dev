import gql from 'graphql-tag'
import { personFragmentBasic } from './person'

export const execFragmentBasic = gql`
	fragment execFragmentBasic on Exec {
		id
		person { ...PersonFragmentBasic }
	}
	${personFragmentBasic}
`

export const upsertExec = gql`
	mutation upsertExec($input: ExecInput!) {
		upsertExec(input: $input) {
			id
		}
	}
`