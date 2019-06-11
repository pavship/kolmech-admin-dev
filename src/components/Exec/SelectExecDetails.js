import React, { useState } from 'react'
import { useMutation, useQuery } from '../hooks/apolloHooks'
import { personExecs } from '../../graphql/person'
import { upsertPerson2 as uP } from '../../graphql/person'

import styled from 'styled-components'
import { Div } from '../styled/styled-semantic'
import { Menu } from '../Details/Menu/Menu'
import LeftIcon from '../Details/Menu/LeftIcon'
import { Dimmer, Loader } from 'semantic-ui-react';
import produce from 'immer';
import { assignNested, getStructure } from '../form/utils';

const ListTitle = styled.h4`
	margin: 0;
	padding: 1em 1em 1em 55px;
`

const ListItemContainer = styled.div`
  display: flex;
	cursor: pointer;
	border-width: 1px 0;
	border-style: solid;
	border-color: white;
  :hover {
    background: rgb(250, 250, 250);
    color: rgba(0,0,0,.95);
  }
  ${props => props.active && `
		background: rgba(0,0,0,.05);
		font-weight: bold;
		border-color: rgba(34, 36, 38, 0.15);
		// border-top: 1px solid rgba(34, 36, 38, 0.15);
		// border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	`}
`

const ListItem = ({
  active,
	text,
	onClick,
}) => <ListItemContainer
		active={active}
		onClick={onClick}
	>
  <LeftIcon
    name={active ? 'check square outline' : 'square outline'}
  />
  <Div>
		{text}
  </Div>
</ListItemContainer>

export default function SelectExecDetails ({
  details: {
		opTypeId,
		onSubmit
	},
  setDetails,
}) {
  const { data, loading } = useQuery(personExecs)
	const [ execId, setExecId ] = useState('')
	const [ personId, setPersonId ] = useState('')
	const [ search, setSearch ] = useState('')
	const persons = data && data.persons && data.persons
		.filter(p => !search || p.amoName.indexOf(search) !== -1) || []
	const [ upsertPerson ] = useMutation(uP, { variables: { input:
		produce(getStructure(persons.find(p => p.id === personId)), draft => {
			if (!personExecs.exec) assignNested(draft, `exec`, { opTypes: [{ opTypeId }] })
			else assignNested(draft, `exec.opTypes[length]`, { opTypeId })
		})
	}})
  return <>
    <Menu
      setDetails={setDetails}
      title='Выбор исполнителя'
      onSubmit={async () => {
				if (personId) {
					const { data } = await upsertPerson()
					console.log('data > ', data)

				}

				// let createdExec = null
				// onSubmit(execId)
			}}
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
			{loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> : <>
				<ListTitle>Для выбранной операции</ListTitle>
				{persons
					.filter(p => p.exec && p.exec.opTypes.findIndex(ot => ot.id === opTypeId) !== -1)
					.map(p => <ListItem
						key={p.id}
						active={p.exec.id === execId}
						text={p.amoName}
						onClick={() => setExecId(p.exec.id) || setPersonId('')}
					/>)
				}
				<ListTitle>Остальные исполнители</ListTitle>
				{persons
					.filter(p => p.exec && p.exec.opTypes.findIndex(ot => ot.id === opTypeId) === -1)
					.map(p => <ListItem
						key={p.id}
						active={p.exec.id === execId}
						text={p.amoName}
					/>)
				}
				<ListTitle>Все контакты</ListTitle>
				{persons
					.filter(p => !p.exec)
					.map(p => <ListItem
						key={p.id}
						active={p.id === personId}
						text={p.amoName}
						onClick={() => console.log('p.id > ', p.id) || setPersonId(p.id) || setExecId('')}
					/>)
				}
			</>}
		</Div>
  </>
}