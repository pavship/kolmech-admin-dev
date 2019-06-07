import gql from 'graphql-tag'
import { dealStatusFragmentBasic, dealStatusFragmentFull } from './dealStatus'
import { orgFragmentBasic } from './org'
import { batchFragmentBasic, batchFragmentMiddle } from './batch'
import { opTypeFragmentBasic } from './opType'

export const dealFragmentBasic = gql`
	fragment DealFragmentBasic on Deal {
    id
    amoId
    name
		status { ...DealStatusFragmentBasic }
  }
  ${dealStatusFragmentBasic}
`

export const dealFragmentMiddle = gql`
	fragment DealFragmentMiddle on Deal {
		...DealFragmentBasic
		date
		org { ...OrgFragmentBasic}
		batches { ...BatchFragmentBasic}
  }
  ${dealFragmentBasic}
  ${orgFragmentBasic}
  ${batchFragmentBasic}
`

export const dealFragmentFull = gql`
	fragment DealFragmentFull on Deal {
		...DealFragmentMiddle
    status { ...DealStatusFragmentFull }
	}
	${dealFragmentMiddle}
	${dealStatusFragmentFull}
`

export const CODetails = gql`
	query deal ($id: ID!) {
		deal (id: $id) {
			id
			batches { ...batchFragmentMiddle}
		}
	}
	${batchFragmentMiddle}
`

export const createCO = gql`
	mutation createCO($id: ID!, $date: String) {
		createCO(id: $id, date: $date) {
			statusText
		}
	}
`

// export const orgLocal = gql`
// 	query OrgLocal ($id: ID!) {
// 		orgLocal (id: $id) {
// 			...OrgFragmentBasic
// 		}
// 	}
// 	${orgFragmentBasic}
// `

// export const orgDetails = gql`
// 	query orgDetails ($id: ID!) {
// 		orgDetails (id: $id) {
// 			...OrgFragmentFull
// 		}
// 	}
// 	${orgFragmentFull}
// `

export const dealsPage = gql`
	query Deals {
		deals { ...DealFragmentMiddle }
		orgs { ...OrgFragmentBasic }
		opTypes { ...OpTypeFragmentBasic }
	}
	${dealFragmentMiddle}
	${orgFragmentBasic}
	${opTypeFragmentBasic}
`

export const connectDealToOrg = gql`
	mutation ConnectDealToOrg($orgId: ID! $dealId: ID!) {
		connectDealToOrg(orgId: $orgId dealId: $dealId) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`

export const syncDeals = gql`
	mutation syncDeals {
		syncDeals {
			count
		}
	}
`

export const upsertDeal = gql`
	mutation upsertDeal($input: DealInput!) {
		upsertDeal(input: $input) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`