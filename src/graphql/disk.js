import gql from 'graphql-tag'

export const highlightFolder = gql`
	mutation highlightFolder ($orgId: ID) {
		highlightFolder (orgId: $orgId) {
			statusText
		}
	}
`
