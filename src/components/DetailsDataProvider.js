import React from 'react'
import { compose, graphql } from 'react-apollo'

import { enquiryDetails } from '../graphql/enquiry'
import { orderDetails } from '../graphql/order'

const DetailsDataProvider = ({ type, id, query, children }) => {
  const { loading, error, refetch } = query
  const entity =
    type === 'Enquiry' ? query.enquiry :
    type === 'Order' ? query.order
    : null
  return children({ loading, error, refetch, entity })
}

export default compose(
  graphql(orderDetails, { name: 'query', skip: ({ type }) => type !== 'Order' }),
  graphql(enquiryDetails, { name: 'query', skip: ({ type }) => type !== 'Enquiry' }),
)(DetailsDataProvider)