import React from 'react'

import styled from 'styled-components'
import { Div, Icon } from '../styled/styled-semantic'

const Container = styled.div`
  display: flex;
  padding: 0 1em 0 55px;
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

const ControlsContainer = styled.div`
  display: flex;
  width: 30px;
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
  ${Container}:hover & {
    opacity: 1;
  }
`

export function TaskListItem ({
  task: { text, order },
  // active,
	// onClick,
}) {
  return <Container
    // active={active}
    // onClick={onClick}
  >
    <Div
      w='25px'
    >{order + 1}.</Div>
    {/* <LeftIcon
      name={active ? 'check square outline' : 'square outline'}
    /> */}
    <Div>
      {text}
    </Div>
    <ControlsContainer>
      <Icon
        link
        name='trash'
        color='grey'
        activeColor='red'
      />
    </ControlsContainer>
  </Container>
}