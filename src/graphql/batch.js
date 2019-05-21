import gql from 'graphql-tag'
import { modelFragmentBasic } from './model'
import { procFragmentBasic } from './proc'

export const batchFragmentBasic = gql`
	fragment BatchFragmentBasic on Batch {
		id
		qty
		model { ...ModelFragmentBasic }
		procs { ...ProcFragmentBasic }
	}
	${modelFragmentBasic}
	${procFragmentBasic}
`

export const upsertBatch = gql`
	mutation upsertBatch($input: BatchInput!) {
		upsertBatch(input: $input) {
			...BatchFragmentBasic
		}
	}
	${batchFragmentBasic}
`