import React from 'react'

import styled from 'styled-components'
import { Button, A, Div } from '../styled/styled-semantic'
import { persons } from '../../graphql/person';
import { Statistic } from 'semantic-ui-react'

const Container = styled.div`
  flex: 1 1 500px;
  box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 2rem;
  font-size: 1.28571429rem;
  line-height: 1.28571429em;
  font-weight: bold;
  border-bottom: 1px solid rgba(34,36,38,.15);
`

export default ({
  accounts,
}) => {
  return (
  // <Container>
  //   <Header>
  //     Остатки
  //     <pre>{JSON.stringify(accounts, null, 2)}</pre>
  //   </Header>
  // </Container>
    <Div
      m='0 30px'
    >
      <Statistic.Group>
        <Statistic>
          <Statistic.Value
            content={accounts.reduce((sum, a) => sum + a.total, 0) + ' ₽'}
          />
          <Statistic.Label
            content='Касса, в т.ч.'
          />
          <Statistic.Group horizontal>
            {accounts.map(({ id, name, total }) =>
              <Statistic
                key={id}
                label={name}
                value={total + ' ₽'} 
              />
            )}
          </Statistic.Group>
        </Statistic>
        <Statistic>
          <Statistic.Value
            content={accounts.reduce((sum, a) => sum + a.total, 0) + ' ₽'}
          />
          <Statistic.Label
            content='Нам должны, в т.ч.'
          />
          <Statistic.Group
            horizontal
            size='small'
          >
            {accounts.map(({ id, name, total }) =>
              <Statistic
                key={id}
                label={name}
                value={total + ' ₽'} 
              />
            )}
          </Statistic.Group>
        </Statistic>
        <Statistic>
          <Statistic.Value
            content={accounts.reduce((sum, a) => sum + a.total, 0) + ' ₽'}
          />
          <Statistic.Label
            content='Мы должны, в т.ч.'
          />
          <Statistic.Group
            horizontal
            size='small'
          >
            {accounts.map(({ id, name, total }) =>
              <Statistic
                key={id}
                label={name}
                value={total + ' ₽'} 
              />
            )}
          </Statistic.Group>
        </Statistic>
      </Statistic.Group>
    </Div>
  )
}

