import gql from 'graphql-tag'
import { modelFragmentBasic, modelFragmentWithDrawings } from './model'
import { procFragmentBasic } from './proc'
import { workpieceFragmentWithDrawings } from './workpiece'

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

export const batchFragmentMiddle = gql`
	fragment BatchFragmentMiddle on Batch {
		...BatchFragmentBasic
		model { ...ModelFragmentWithDrawings }
		workpiece { ...WorkpieceFragmentWithDrawings }

	}
	${modelFragmentWithDrawings}
	${batchFragmentBasic}
	${workpieceFragmentWithDrawings}
`

export const upsertBatch = gql`
	mutation upsertBatch($input: BatchInput!) {
		upsertBatch(input: $input) {
			...BatchFragmentBasic
		}
	}
	${batchFragmentBasic}
`