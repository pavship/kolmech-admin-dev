import React from 'react'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Segment, List } from 'semantic-ui-react'

const DRAFTS_QUERY = gql`
    query DraftsQuery {
        drafts {
            id
            text
            title
            isPublished
        }
    }
`

const Enquiries = () => {
    return (
        <Query query={DRAFTS_QUERY}>
            {({ data }) => {
                return (
                    <Segment>
                        <List size='huge' divided>
                            <List.Item>item1</List.Item>
                            <List.Item>item2</List.Item>
                            <List.Item>{JSON.stringify(data)}</List.Item>
                        </List>
                    </Segment>
                )
            }}
        </Query>
    )
}

export default Enquiries