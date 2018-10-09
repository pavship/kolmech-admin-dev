import gql from 'graphql-tag'

// export const org = gql`
// 	query org ($id: ID!) {
// 		org (id: $id) {
// 			id
// 			inn
// 			name
// 		}
// 	}
// `

export const modelProds = gql`
	query ModelProds ($modelId: ID!) {
		modelProds (modelId: $modelId) {
			id
			fullnumber,
      hasDefect,
      isSpoiled,
      progress,
			dept {
				id
				name
				type
			}
			order {
				id
				num
				enquiry {
					id
					num
				}
			}
		}
	}
`
