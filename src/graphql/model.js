import gql from 'graphql-tag'
import { drawingFragmentBasic } from './drawing';

export const modelFragmentBasic = gql`
	fragment ModelFragmentBasic on Model {
		id
		name
		article
	}
`

export const modelFragmentFull = gql`
	fragment ModelFragmentFull on Model {
		...ModelFragmentBasic
		drawings { ...DrawingFragmentBasic }
	}
	${modelFragmentBasic}
	${drawingFragmentBasic}
`

export const modelLocal = gql`
	query ModelLocal ($id: ID!) {
		modelLocal (id: $id) {
			...ModelFragmentBasic
		}
	}
	${modelFragmentBasic}
`

export const modelDetails = gql`
	query ModelDetails ($id: ID!) {
		model (id: $id) {
			...ModelFragmentFull
		}
	}
	${modelFragmentFull}
`

export const upsertModel = gql`
	mutation UpsertModel(
		$input: ModelInput!
	) {
		upsertModel(
			input: $input
		) {
			id
		}
	}
`