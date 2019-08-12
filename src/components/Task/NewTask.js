import React from 'react'

import styled from 'styled-components'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import LeftIcon from '../Details/Menu/LeftIcon';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  align-items: baseline;
  padding: 1em 1em 1em 0;
  border-top: 1px solid #2185d0;
  border-bottom: 1px solid #2185d0;
`

const IconContainer = styled.div`
  width: 55px;
`

const Container1 = styled.div`
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
	`}
`

export function NewTask ({
  text,
  setText,
  upsertTask
}) {
  return <Container>
    <LeftIcon
      size='big'
      name='plus'
      color='blue'
      disabled={!text}
      onClick={() => upsertTask()}
    />
    <Field
      label='Новая задача'
      inputWidth='257px'
      type='textarea'
      value={text}
      onChange={text => setText(text)}
    />
    {/* <Field
      label='Дедлайн'
      type='datetime-local'
      value={from}
      onChange={date => setFrom(date)}
    /> */}
  </Container>
}