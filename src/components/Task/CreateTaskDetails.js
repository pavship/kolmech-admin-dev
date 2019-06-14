import React, { useState } from 'react'
import { Menu } from '../Details/Menu/Menu'
import { useMutation } from '../hooks/apolloHooks'
import { upsertOp as uO } from '../../graphql/op'
import { toLocalDatetimeString } from '../../utils/dates'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import DealDetails from '../Deals/Details/Details'

export default function CreateComOfferDetails ({
  details: { opId },
  setDetails
}) {
  const [ amoUserId, setAmoUserId ] = useState(0)
  const [ date, setDate ] = useState(toLocalDatetimeString(new Date()))
  const [ description, setDescription ] = useState()
  const [ upsertOp ] = useMutation(uO, { variables: { opId, amoUserId, date, description } })
  return <>
    <Menu
      setDetails={setDetails}
      title='Добавить задачу в AmoCRM'
      onSubmit={() => upsertOp()}
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
			<Div
				p='1em 1em 1em 55px'
			>
        <Field
					label='Кому'
					type='select'
					value={date}
					onChange={date => setDate(date)}
				/>
				<Field
					label='Срок'
					type='datetime-local'
					value={date}
					onChange={date => setDate(date)}
				/>
				<Field
					label='Описание'
					type='textarea'
					value={description}
					onChange={text => setDescription(text)}
				/>
			</Div>
			{/* <DealDetails
				dealId={dealId}
			/> */}
		</Div>
  </>
}