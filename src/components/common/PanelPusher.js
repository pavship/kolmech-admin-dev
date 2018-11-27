import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: calc(100vh - 36px) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Main = styled.div`
  flex: 1 1 auto;
`

const Panel = styled.div`
  flex: 0 0 386px;
  max-height: 386px;
  box-shadow: 0 0 20px rgba(34,36,38,.15);
  transition: transform .5s ease-out;
  ${props => !props.panelVisible && `
    transform: translateY(100%);
  `}
`

export default class PanelPusher extends Component {
  render() {
    const {
      children,
      panel,
      panelVisible
    } = this.props
    return (
      <Container>
        <Main
          panelVisible={panelVisible}
        >
          {children}
        </Main>
        <Panel
          panelVisible={panelVisible}
        >
          {panel}
        </Panel>
      </Container>
    )
  }
}
