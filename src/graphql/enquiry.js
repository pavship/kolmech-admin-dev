import gql from 'graphql-tag'

export const allEnquiries = gql`
    query AllEnquiries {
        enquiries {
            id
            num
            dateLocal
            message
        }
    }
`

export const enquiry = gql`
    query Enquiry ($id: ID!) {
		enquiry (id: $id) {
            id
			num
			dateLocal
			message
		}
	}
`

export const newEnquiry = gql`
    query NewEnquiry {
        newEnquiry @client
    }
`

export const createEnquiry = gql`
    mutation createEnquiry($dateLocal: String!) {
        createEnquiry(dateLocal: $dateLocal) {
            id
			num
			dateLocal
			message
        }
    }
`

export const updateEnquiry = gql`
    mutation UpdateEnquiry($id: ID!, $dateLocal: String) {
        updateEnquiry(id: $id, dateLocal: $dateLocal) {
            id
			num
			dateLocal
			message
        }
    }
`

// export const alteredEnquiry = gql`
//     query AlteredEnquiry($id: ID!) {
//         alteredEnquiry(id: $id) @client
//     }
// `

// export const updateAlteredEnquiry = gql`
//     mutation UpdateAlteredEnquiry($key: String!, $value: String!) {
//         updateAlteredEnquiry(key: $key, value: $value) @client
//     }
// `