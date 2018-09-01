import gql from 'graphql-tag'

export const allEnquiries = gql`
    query AllEnquiries {
        enquiries {
            id
            num
            dateLocal
            org {
                id
                name
            }
        }
    }
`

export const enquiry = gql`
    query Enquiry ($id: ID!) {
		enquiry (id: $id) {
            id
			num
			dateLocal
            org {
                id
                name
            }
            comments {
                id
                datetimeLocal
                htmlText
                type
                user {
                    person {
                        fName
                        lName
                    }
                }
            }
		}
	}
`

export const newEnquiry = gql`
    query {
        newEnquiry @client {
            id
        }
    } 
`

export const createEnquiry = gql`
    mutation createEnquiry($dateLocal: String!, $orgId: ID!) {
        createEnquiry(dateLocal: $dateLocal, orgId: $orgId) {
            id
			num
			dateLocal
            org {
                id
                name
            }
        }
    }
`

export const updateEnquiry = gql`
    mutation UpdateEnquiry($input: EnquiryInput!) {
        updateEnquiry(input: $input) {
            id
			num
			dateLocal
            org {
                id
                name
            }
            comments {
                id
                datetimeLocal
                htmlText
                type
                user {
                    person {
                        fName
                        lName
                    }
                }
            }
        }
    }
`

export const createEnquiryComment = gql`
    mutation CreateEnquiryComment($enquiryId: ID!, $htmlText: String) {
        createEnquiryComment(enquiryId: $enquiryId, htmlText: $htmlText) {
            id
            datetimeLocal
            htmlText
            type
            user {
                person {
                    fName
                    lName
                }
            }
        }
    }
`

export const enquiryFragment = gql`
    fragment myEnquiry on Enquiry {
        id
        num
        dateLocal
        comments {
            id
            datetimeLocal
            htmlText
            type
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