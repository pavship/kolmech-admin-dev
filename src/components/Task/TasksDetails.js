import React, { useState } from 'react'
import { useQuery, useMutation } from '../hooks/apolloHooks'
import {
  tasksDetails,
  upsertTask as uT
} from '../../graphql/task'

import styled from 'styled-components'
import { Menu } from '../Details/Menu/Menu'
import { toLocalDatetimeString } from '../../utils/dates'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import { Dimmer, Loader } from 'semantic-ui-react'

const ListTitle = styled.h4`
	margin: 0;
	padding: 1em 1em 1em 55px;
	display: flex;
`

export default function TasksDetails ({
  details: { appointId },
  setDetails
}) {
	const [ from, setFrom ] = useState(toLocalDatetimeString(new Date()))
	const [ text, setText ] = useState()
  const { data, loading, error } = useQuery(tasksDetails)
	const [ upsertTask ] = useMutation(uT, {
		variables: { input: {
			from: new Date(from).toISOString(),
			text,
			status: 'ACTIVE',
			appointId
		}}
  })
  return <>
    <Menu
      setDetails={setDetails}
      title='Задачи'
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
      {!error && loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> : <>
        <ListTitle>Мои задачи</ListTitle>
        <ListTitle>Мои задачи</ListTitle>
        <Div
          p='1em 1em 1em 55px'
        >
          {/* <Field
            label='Кому'
            type='select'
            value={date}
            onChange={date => setDate(date)}
          /> */}
          <Field
            label='Дата и время'
            type='datetime-local'
            value={from}
            onChange={date => setFrom(date)}
          />
          <Field
            label='Задача'
            inputWidth='257px'
            type='textarea'
            value={text}
            onChange={text => setText(text)}
          />
        </Div>
        {/* <BatchDetails
          dealId={dealId}
        /> */}
      </>}
		</Div>
  </>
}