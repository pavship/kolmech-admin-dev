import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  left: 542px;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,rgba(0,0,0,.01) 0%,rgba(200,201,202,1) 100%);
  z-index: -1;
`

export default function Timeline ({

}) {
  return <Container
    onClick={()=>console.log('container here!')}
  >
  </Container>
}