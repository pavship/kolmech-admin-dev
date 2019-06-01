import React, { useState, useContext } from 'react'

import { Dropdown } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'

import styled from 'styled-components'
import DiskContext from '../../context/DiskContext'

const MenuButton = styled.div`
  .dropdown {
    width: 30px;
    text-align: center;
  }
  .icon {
    margin: 0;
    color: rgba(50,50,50,.87);
  }
  transition: background .3s ease;
  :hover {
    background: rgba(0,0,0,.12);
    .icon {
      opacity: 1 !important;
    }
  }
`

export default ({
  deal
}) => {
  const { id: dealId, amoId } = deal
  const { highlightFolder } = useContext(DiskContext)
  const [isHovered, setIsHovered] = useState(false)
  return <Div
    d='flex'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <Div
      ov='hidden'
      to='ellipsis'
      w={isHovered ? '150px' : undefined}
      fw={isHovered ? 'bold' : undefined}
    >
      {deal && deal.name}
    </Div>
    {isHovered &&
      <MenuButton>
        <Dropdown
          icon={{
            name: 'bars',
            link: true
          }}
          direction='left'
        >
          <Dropdown.Menu>
            <Dropdown.Header>
              <a
                target="_blank" rel="noopener noreferrer" 
                href={`https://kolomnatutamailcom.amocrm.ru/leads/detail/${amoId}`}
              >AmoCRM</a>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item
              icon='folder'
              text='Обнаружить папку'
              onClick={() => highlightFolder({ dealId })}
            />
          </Dropdown.Menu>
        </Dropdown>
      </MenuButton>
    }
  </Div>
}
