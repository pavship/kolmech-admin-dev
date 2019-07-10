import React from 'react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'

const Container = styled.div`
  /* position: fixed;
  left: calc(542px - 700px); */
  display: flex;
  /* width: 100%; */
  width: 2100px;
  height: 23px;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
`

export default function Header ({
  days
}) {
  
  return <Container
    onClick={()=>console.log('plotHeader here!')}
  >
    {days.map(({ key, day, isWeekend }) =>
      <Div
        key={key}
        w='50px'
        c='rgba(0,0,0,.6)'
        ta='center'
        bc={isWeekend ? 'rgba(0,0,0,.07)' : undefined}
      >
        {day}
      </Div>
    )}
  </Container>
}