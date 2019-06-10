import React, { useState } from 'react'
import { Menu } from '../Details/Menu/Menu'
import { useMutation } from '../hooks/apolloHooks'
import { createAmoTask as cAT } from '../../graphql/deal'
import { toLocalDatetimeString } from '../../utils/dates'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import DealDetails from '../Deals/Details/Details'

export default function CreateComOfferDetails ({
  details: { dealId },
  setDetails
}) {
  const [ date, setDate ] = useState(toLocalDatetimeString(new Date()))
  const [ createAmoTask ] = useMutation(cAT, { variables: { dealId, date } })
  return <>
    <Menu
      setDetails={setDetails}
      title='Добавить задачу в AmoCRM'
      onSubmit={() => createAmoTask()}
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
					type='datetime-local'
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