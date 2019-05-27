import gql from 'graphql-tag'

export const orgFragmentBasic = gql`
	fragment OrgFragmentBasic on Org {
		id
		inn
		name
	}
`

export const orgFragmentFull = gql`
	fragment OrgFragmentFull on Org {
		...OrgFragmentBasic
	}
	${orgFragmentBasic}
`

export const org = gql`
	query org ($id: ID!) {
		org (id: $id) {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const allOrgs = gql`
	query allOrgs {
		orgs {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const createOrg = gql`
	mutation createOrg($inn: String!) {
		createOrg(inn: $inn) {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const mergeOrg = gql`
	mutation mergeOrg($id: ID!, $inn: String!) {
		mergeOrg(id: $id, inn: $inn) {
			...OrgFragmentFull
		}
	}
	${orgFragmentFull}
`

export const orgLocal = gql`
	query OrgLocal ($id: ID!) {
		orgLocal (id: $id) {
			...OrgFragmentBasic
		}
	}
	${orgFragmentBasic}
`

export const orgDetails = gql`
	query org ($id: ID!) {
		model (id: $id) {
			...OrgFragmentFull
		}
	}
	${orgFragmentFull}
`