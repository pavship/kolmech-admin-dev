import gql from 'graphql-tag'

export const upsertOrder = gql`
    mutation UpsertOrder($id: ID, $enquiryId: ID, $dateLocal: String!, $qty: Int, $amount: Float) {
        upsertOrder(id: $id, enquiryId: $enquiryId, dateLocal: $dateLocal, qty: $qty, amount: $amount) {
            id
			dateLocal
            qty
            amount
        }
    }
`