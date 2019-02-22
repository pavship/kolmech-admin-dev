import gql from 'graphql-tag'

export const articleFragmentBasic = gql`
	fragment ArticleFragmentBasic on Article {
		id
		rusName
	}
`

export const articleFragmentFull = gql`
	fragment ArticleFragmentFull on Article {
		...ArticleFragmentBasic
		isLoan
		isIncome
	}
	${articleFragmentBasic}
`
