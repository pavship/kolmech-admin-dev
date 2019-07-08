import React from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 23px;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
`

export default function Header ({

}) {
  let days = []
  for (
    let d = new Date(new Date().setDate(new Date().getDate() - 18)), i = 0;
    i < 42;
    d.setDate(d.getDate() + 1), i++
  ) {
    days.push({key: i, day: d.getDate()})
  }
  return <Container>
    {days.map(({ key, day }) =>
      <Div
        key={key}
        w='50px'
        c='rgba(0,0,0,.6)'
        ta='center'
      >
        {day}
      </Div>
    )}
  </Container>
}