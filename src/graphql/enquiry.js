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

export const alteredEnquiry = gql`
    query AlteredEnquiry($id: ID!) {
        alteredEnquiry(id: $id) @client
    }
`

export const assignCurrentEnquiry = gql`
    mutation AssignCurrentEnquiry($id: ID!) {
        assignCurrentEnquiry(id: $id) @client
    }
`

export const updateEnquiry = gql`
    mutation UpdateEnquiry($key: String!, $value: String!) {
        updateEnquiry(key: $key, value: $value) @client
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