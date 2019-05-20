import gql from 'graphql-tag'
import { dealStatusFragmentBasic, dealStatusFragmentFull } from './dealStatus'
import { orgFragmentBasic } from './org'
import { modelFragmentBasic } from './model'

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
		org { ...OrgFragmentBasic}
		models { ...ModelFragmentBasic}
  }
  ${dealFragmentBasic}
  ${orgFragmentBasic}
  ${modelFragmentBasic}
`

export const dealFragmentFull = gql`
	fragment DealFragmentFull on Deal {
		...DealFragmentBasic
    status { ...DealStatusFragmentFull } 
	}
	${dealFragmentBasic}
	${dealStatusFragmentFull}
`

export const dealsPage = gql`
	query Deals {
		deals { ...DealFragmentMiddle }
		orgs { ...OrgFragmentBasic }
		models { ...ModelFragmentBasic }
	}
	${dealFragmentMiddle}
	${orgFragmentBasic}
	${modelFragmentBasic}
`

export const connectDealToOrg = gql`
	mutation ConnectDealToOrg($orgId: ID! $dealId: ID!) {
		connectDealToOrg(orgId: $orgId dealId: $dealId) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`

export const upsertModelToDeal = gql`
	mutation upsertModelToDeal($name: String! $modelId: ID $dealId: ID!) {
		upsertModelToDeal(name: $name modelId: $modelId dealId: $dealId) {
			...DealFragmentMiddle
		}
	}
	${dealFragmentMiddle}
`