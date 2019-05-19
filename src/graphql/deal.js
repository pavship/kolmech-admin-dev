import gql from 'graphql-tag'
import { dealStatusFragmentBasic, dealStatusFragmentFull } from './dealStatus';

export const dealFragmentBasic = gql`
	fragment DealFragmentBasic on Deal {
    id
    amoId
    name
    status { ...DealStatusFragmentBasic }
  }
  ${dealStatusFragmentBasic}
`

export const dealFragmentFull = gql`
	fragment DealFragmentFull on Deal {
		...DealFragmentBasic
    status { ...DealStatusFragmentFull } 
	}
	${dealFragmentBasic}
	${dealStatusFragmentFull}
`

export const deals = gql`
	query Deals {
		deals { ...DealFragmentBasic }
	}
	${dealFragmentBasic}
`