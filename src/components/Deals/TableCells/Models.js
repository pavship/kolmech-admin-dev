import React from 'react'

import styled from 'styled-components'

import Model from'./Model'

const Container = styled.div`
  /* ${props => props.isRowHovered && 'background: red;'} */
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

export default ({
  isRowHovered,
  notify,
  deal,
  models: allModels
}) => {
  return [...deal.models, { id: 0 }].map(model =>
    <Container
      key={model.id}
      isRowHovered={isRowHovered}
    >
      <Model
        notify={notify}
        deal={deal}
        model={model}
      />
    </Container>
  )
}