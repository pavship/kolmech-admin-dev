import gql from 'graphql-tag'

export default gql`
    mutation UpdateEnquiry($key: String!, $value: String!) {
        updateEnquiry(key: $key, value: $value) @client
    }
`