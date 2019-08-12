import React, { useState, useContext } from 'react'
import groupBy from 'lodash/groupBy'
import { toLocalDatetimeString } from '../../utils/dates'
import { useQuery, useMutation } from '../hooks/apolloHooks'
import {
  tasksDetails,
  upsertTask as uT
} from '../../graphql/task'
import UserContext from '../context/UserContext'

import styled from 'styled-components'
import { Div } from '../styled/styled-semantic'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Menu } from '../Details/Menu/Menu'
import { useApolloClient } from '@apollo/react-hooks'
import { TaskListItem } from './TaskListItem'
import cuid from 'cuid'
import { NewTask } from './NewTask';

const ListTitle = styled.h4`
	margin: 0;
	padding: 1em 1em 1em 55px;
	display: flex;
`

export default function TasksDetails ({
  details: { appoint },
  setDetails
}) {
  const { id: appointId, exec: { id: execId } } = appoint
	const [ from, setFrom ] = useState(toLocalDatetimeString(new Date()))
  const [ text, setText ] = useState()
  const { me: { person: {exec: { id: userExecId } }}} = useContext(UserContext)
  const client = useApolloClient()
  const { data, loading, error } = useQuery(tasksDetails)
  console.log('appoint > ', appoint)
  let newTaskOrder = 0
	const [ upsertTask ] = useMutation(uT, {
		variables: { input: {
			from: new Date(from).toISOString(),
			text,
      status: 'ACTIVE',
      order: newTaskOrder,
			appointId
		}}
  })
  const tasksByExec = !(data && data.tasks)
    ? {}
    : (() => {
        const grouped = groupBy(data.tasks, 'exec.id')
        console.log('grouped > ', grouped)
        grouped[execId] = grouped[execId] || []
        newTaskOrder = grouped[execId].length
        grouped[execId].push({
          isNew: true,
          appoint
        })
        return grouped
      })()
  console.log('tasksByExec > ', tasksByExec)
  const execIds = Object.keys(tasksByExec)
  console.log('execIds > ', execIds)
  return <>
    <Menu
      setDetails={setDetails}
      title='Задачи'
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
      {!execIds.length ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> : <>
        <ListTitle>Мои задачи</ListTitle>

        {execIds
          .filter(execId => execId !== userExecId)
          .map(execId => {
            const tasks = tasksByExec[execId]
            console.log('tasks > ', tasks)
            console.log('tasks[0].appoint.exec.person.amoName > ', tasks[0].appoint.exec.person.amoName)
            return <div
              key={execId}
            >
              <ListTitle>{tasks[0].appoint.exec.person.amoName}</ListTitle>
              {tasks.map(task => task.isNew
                ? <NewTask
                    key={cuid()}
                    text={text}
                    setText={setText}
                    // upsertTask={() => upsertTask({ variables: { order: task.order }})}
                    upsertTask={() => console.log('newTaskOrder > ', newTaskOrder) || upsertTask()}
                  />
                : <TaskListItem
                    key={task.id}
                    task={task}
                    // active={p.exec.id === execId}
                    // onClick={() => setPersonId(p.id) || setExecId('')}
                  />
              )}
            </div>
          }
        )}
      </>}
		</Div>
  </>
}