import gql from 'graphql-tag'
import { articleFragmentBasic, articleFragmentFull } from './article'
import { personFragmentBasic } from './person'
import { accountFragmentBasic, accountFragmentFull } from './account'

export const paymentFragmentBasic = gql`
	fragment PaymentFragmentBasic on Payment {
		id
		dateLocal
		amount
		account { ...AccountFragmentBasic }
		article { ...ArticleFragmentBasic }
		person { ...PersonFragmentBasic }
	}
	${accountFragmentBasic}
	${articleFragmentBasic}
	${personFragmentBasic}
`

export const paymentsPage = gql`
	query PaymentsPage {
		accounts { ...AccountFragmentFull }
		articles { ...ArticleFragmentFull }
		payments { ...PaymentFragmentBasic }
	}
	${accountFragmentFull}
	${articleFragmentFull}
	${paymentFragmentBasic}
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
