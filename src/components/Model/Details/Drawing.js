import React from 'react'

import styled from 'styled-components'
import posed from 'react-pose'
import { Icon } from '../../styled/styled-semantic';

const Container = styled.div`
  width: 100%;
  height: calc(792px/${props => props.proportion});
  max-height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,50,.03);
  border-bottom: 1px solid rgba(126,127,129,1);
`

const ImgSpacer = posed.div({
  shrinked: {
    width:  'calc(100% - 60px)',
    height: ({ proportion }) => `calc(100% - 60px/${proportion})`
  },
  fullsize: {
    width: '100%',
    height: '100%'
  }
})

const Image = styled.img`
  width: 100%;
  height: 100%;
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
  /* pointer-events: none; */
  :hover {
    opacity: 1;
  }
  ${({ hide }) => hide && `
    opacity: 1;
    background-image: unset;
  `}
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

export default ({
  drawing: { id, files },
  select,
  selected
}) => {
  const oriImage = files.find(f => f.isOri)
  const image = files.find(f => f.width === 792) || oriImage
  const { path, filename, width, height} = image
  const proportion = width/height
  return (
    <Container
      proportion={proportion}
    >
      <Mask
        hide={selected}
        onClick={() => {
          if (selected) return select(id) // deselect drawing
          // otherwise open fullsize image in new tab
          const win = window.open(oriImage.path, '_blank')
          win.focus()
        }}
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
      </Mask>
      <ImgSpacer
        pose={selected ? 'shrinked' : 'fullsize'}
        proportion={proportion}
        onClick={() => selected && select(id)}
      >
        <Image
          src={path}
          width={width}
          height={height}
          
        />
      </ImgSpacer>
    </Container>
  )
}
