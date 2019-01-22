import gql from 'graphql-tag'
import { fileFragmentBasic } from './file'

export const drawingFragmentBasic = gql`
	fragment DrawingFragmentBasic on Drawing {
		id
		file { ...FileFragmentBasic }
	}
	${fileFragmentBasic}
`

export const createDrawings = gql`
	mutation CreateDrawings(
		$modelId: ID!
		$files: [Upload!]!
	) {
		createDrawings(
			modelId: $modelId
			files: $files
		) {
			...DrawingFragmentBasic
		}
	}
	${drawingFragmentBasic}
`