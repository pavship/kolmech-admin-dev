import React from 'react'
import Menu from '../Menu';
import { Query } from 'react-apollo';
import { orgLocal } from '../../../graphql/org';

export default ({
  details: {
    id
  },
  setDetails
}) => {
  return <>
    <Query
      query={orgLocal}
      variables={{ id }}
    >
      {({ data: { orgLocal } }) => orgLocal
        ? <Menu
            setDetails={setDetails}
            title={orgLocal.name}
          />
        : null
      }

    </Query>
  </>
}