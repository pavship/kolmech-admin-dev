import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'

export const paymentFragmentBasic = gql`
	fragment PaymentFragmentBasic on Payment {
		id
		dateLocal
		amount
		article { ...ArticleFragmentBasic }
	}
	${articleFragmentBasic}
`

export const payments = gql`
	query Payments {
		payments { ...PaymentFragmentBasic }
		articles { ...ArticleFragmentFull }
	}
	${paymentFragmentBasic}
	${articleFragmentFull}
`

export const upsertPayment = gql`
	mutation UpsertPayment(
		$input: PaymentInput!
	) {
		upsertPayment(
			input: $input
		) {
			...PaymentFragmentBasic
		}
	}
	${paymentFragmentBasic}
`
