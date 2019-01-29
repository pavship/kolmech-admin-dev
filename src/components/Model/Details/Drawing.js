import React from 'react'

import styled from 'styled-components'
import posed from 'react-pose'
import { Button, Icon } from '../../styled/styled-semantic';
// import {  } from 'semantic-ui-react';

const Container = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(126,127,129,1);
`

// const Mask = styled(posed.div({
//   hoverable: true,
//   init: { opacity: 0 },
//   hover: { opacity: 1 }
// }))`
const Mask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  background-image: linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent);
  transition: opacity .135s cubic-bezier(0.0,0.0,0.2,1);
  :hover {
    opacity: 1;
  }
  ${({ hide }) => hide && `
    opacity: 1;
    background-image: unset;
  `}
`

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 45px;
  display: flex;
  align-items: center;
  pointer-events: none;
`

const CheckBox = styled(Icon)`
  position: absolute;
  top: 7px;
  left: 10px;
  color: white;
  ${({ active }) => active ? 'opacity: 1 !important;' : ''}
`

const Check = styled(Icon)`
  position: absolute;
  left: 5px;
  top: 4px;
  &&& {
    ${({ active }) => `
      opacity: ${active ? '.9 !important' : '.2'};
      :hover {
        opacity: ${active ? '.9' : '.5'} !important;
      }
    `}
  }
`

const Image = styled.img`
  width: 100%;
`

export default ({
  drawing: { id, files },
  select,
  selected
}) => {
  console.log('files > ', files)
  const image = files.find(f => f.width === 792) || files.find(f => f.isOri)
  const { path, filename, width, height} = image
  return (
    <Container>
      <Mask
        hide={selected}
      >
        <CheckBox
          link
          name='square'
          size='big'
          fs='2.2em'
          active={selected}
          color={selected ? 'grey' : undefined}
        >
          <Check
            link
            name='check'
            size='small'
            color='black'
            c={selected ? '#fff !important' : undefined}
            active={selected}
            onClick={e => {
              e.stopPropagation()
              select(id)
            }}
          />
        </CheckBox>
        {/* <Menu>
        </Menu> */}
      </Mask>
      <Image
        src={path}
        width={width}
        height={height}
      />
    </Container>
  )
}
