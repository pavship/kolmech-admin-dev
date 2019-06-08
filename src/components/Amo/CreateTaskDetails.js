import React, { useState, useEffect } from 'react'
import { Menu } from '../Details/Menu/Menu'
import { useMutation, useQuery } from '../hooks/apolloHooks'
import {
  // dealDetails as dDq,
  createComOffer as cCO
} from '../../graphql/deal'
import { toLocalDateString } from '../../utils/dates'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
// import { upsertBatch as uBq } from '../../graphql/batch'
// import { getStructure, produceNested } from '../form/utils'
import DealDetails from '../Deals/Details/Details';

export default function CreateComOfferDetails ({
  details: { dealId },
  setDetails
}) {
  // const { loading, data } = useQuery(dDq, { variables: { id: dealId } })
  const [ createCO ] = useMutation(cCO, { variables: { id: dealId } })
  // const [ upsertBatch ] = useMutation(uBq)
  const [ date, setDate ] = useState(toLocalDateString(new Date()))
  // const [ batches, setBatches ] = useState([])
  // useEffect(() => data && data.deal && setBatches(data.deal.batches), [ data ])
  return <>
    <Menu
      setDetails={setDetails}
      title='Создать КП'
      onSubmit={() => createCO({})}
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
			<Div
				p='1em 1em 1em 55px'
			>
				<Field
					label='Дата'
					type='date'
					value={date}
					onChange={date => setDate(date)}
				/>
			</Div>
			<DealDetails
				dealId={dealId}
			/>
		</Div>
  </>
}