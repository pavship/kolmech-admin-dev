import React from 'react'

import styled from 'styled-components'
import posed from 'react-pose'
import { Div } from '../../../styled/styled-semantic'
import Header from './Header'

const Container = styled(posed.div({
  draggable: 'x'
}))`
  position: fixed;
  left: calc(542px - 672px);
  width: 2016px;
  height: calc(100% - 36px);
  z-index: 5;
`

export default function TimelinePlot ({

}) {
  const startDate = new Date(new Date().setDate(new Date().getDate() - 18))
  const currentHalfHour = Math.floor((Date.now() - startDate.setHours(0,0,0,0))/(30*60000))
  let days = []
  for (
    let d = new Date(startDate), i = 0;
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
          t='0'
          l={`${key*48}px`}
          w='48px'
          h='100%'
          bc='rgba(0,0,0,.07)'
        />
    )}
    <Div
      pos='absolute'
      t='0'
      l={`${currentHalfHour}px`}
      w='1px'
      h='100%'
      bc='teal'
    />
  </Container>
}