import React from 'react'

import styled from 'styled-components'
import posed from 'react-pose'
import { Div } from '../../../styled/styled-semantic'
import Header from './Header'

const Container = styled(posed.div({
  draggable: 'x'
}))`
  // position: absolute;
  position: fixed;
  /* top: 36px; */
  left: calc(542px - 700px);
  width: 2100px;
  height: calc(100% - 36px);
  z-index: 5;
`

export default function TimelinePlot ({

}) {
  let days = []
  for (
    let d = new Date(new Date().setDate(new Date().getDate() - 18)), i = 0;
    i < 42;
    d.setDate(d.getDate() + 1), i++
  ) {
    days.push({
      key: i,
      day: d.getDate(),
      isWeekend: [6, 0].includes(d.getDay())
      // isWeekend: d.getDay()
    })
  }
  return <Container
    onClick={()=>console.log('plot here!')}
  >
    <Header
      days={days}
    />
    {days
      .filter(d => d.isWeekend)
      .map(({ key }) =>
        <Div
          key={key}
          pos='absolute'
          t='23px'
          l={`${key*50}px`}
          w='50px'
          h='calc(100% - 23px)'
          bc='rgba(0,0,0,.07)'
        />
    )}
  </Container>
}