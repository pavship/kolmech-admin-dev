import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'
import { personFragmentBasic } from './person';

export const paymentFragmentBasic = gql`
	fragment PaymentFragmentBasic on Payment {
		id
		dateLocal
		amount
		person { ...PersonFragmentBasic }
		article { ...ArticleFragmentBasic }
	}
	${articleFragmentBasic}
	${personFragmentBasic}
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
