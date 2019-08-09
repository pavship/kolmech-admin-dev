import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { dealDetails } from '../../../graphql/deal'
import { Dimmer, Loader } from 'semantic-ui-react'
import BatchDetails from '../../Batch/Details'

export default function DealDetails ({
  dealId
}) {
  const { loading, data } = useQuery(dealDetails, { variables: { id: dealId } })
  return <>
    { loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> :
      data && data.deal && data.deal.batches.map((batch, bIndex) =>
        <BatchDetails
          key={batch.id}
          batch={batch}
          bIndex={bIndex}
        />)
    }
  </>
}