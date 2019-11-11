import gql from 'graphql-tag'

export const mpProjectFragmentBasic = gql`
	fragment mpProjectFragmentBasic on MpProject {
		id
		Name
	}
`

export const mpProjectFragmentFull = gql`
	fragment mpProjectFragmentFull on MpProject {
		...mpProjectFragmentBasic
		Status
		SuperProjectId
	}
	${mpProjectFragmentBasic}
`
