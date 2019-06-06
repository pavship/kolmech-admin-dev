import gql from 'graphql-tag'
import { modelFragmentBasic, modelFragmentWithDrawings } from './model'
import { procFragmentBasic, procFragmentMiddle } from './proc'
import { workpieceFragmentWithDrawings } from './workpiece'

export const batchFragmentBasic = gql`
	fragment BatchFragmentBasic on Batch {
		id
		qty
		model { ...ModelFragmentBasic }
		procs { ...procFragmentBasic }
	}
	${modelFragmentBasic}
	${procFragmentBasic}
`

export const batchFragmentMiddle = gql`
	fragment batchFragmentMiddle on Batch {
		...BatchFragmentBasic
		model { ...ModelFragmentWithDrawings }
		procs { ...procFragmentMiddle }
		workpiece { ...WorkpieceFragmentWithDrawings }
	}
	${modelFragmentWithDrawings}
	${batchFragmentBasic}
	${procFragmentMiddle}
	${workpieceFragmentWithDrawings}
`

export const upsertBatch = gql`
	mutation upsertBatch($input: BatchInput!) {
		upsertBatch(input: $input) {
			...batchFragmentMiddle
		}
	}
	${batchFragmentMiddle}
`