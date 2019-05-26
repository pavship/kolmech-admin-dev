import React, { useState, useRef, useEffect, useContext } from 'react'

import { Icon, Dropdown } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic';

import styled from 'styled-components'
import DiskContext from '../../context/DiskContext';

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
  // isRowHovered,
  deal,
  orgs,
  upsertDeal,
  upsertingDeal,
  // highlightFolder,
  details,
  setDetails
}) => {
  const { id: dealId, org } = deal
  const orgId = (org && org.id) || 0
  const { highlightFolder } = useContext(DiskContext)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode && inputRef.current &&
    inputRef.current.toggle()) || undefined)
  const [isHovered, setIsHovered] = useState(false)
  const options = orgs
    .map(o => ({key:o.id, value: o.id, text: o.name}))
  if (editMode)
    return <Dropdown
      ref={inputRef}
      disabled={upsertingDeal}
      loading={upsertingDeal}
      options={options}
      value={orgId}
      onBlur={() => setEditMode(false)}
      onChange={async (e, { value: orgId }) => {
          await upsertDeal({ variables: { input: {
            id: dealId,
            orgId
          }}})
        setEditMode(false)
      }}
      search
      selection //required when allowAdditions
      selectOnBlur={false}
      selectOnNavigation={false}
      noResultsMessage='Если не найдено, добавьте организацию на странице Платежи'
    />
  else if (orgId === 0)
    return null
    // return <Icon
    //   link
    //   name='plus'
    //   onClick={() => setEditMode(true)}
    // />
  else
    return <Div
      d='flex'
      onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
    >
      <Div
        ov='hidden'
        to='ellipsis'
        w={isHovered ? '170px' : undefined}
        fw={isHovered ? 'bold' : undefined}
        // onClick={() => setEditMode(true)} //block editing
      >
        {org && org.name}
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
              <Dropdown.Item
                icon='folder'
                text='Обнаружить папку'
                onClick={() => highlightFolder({ orgId })}
              />
              <Dropdown.Item
                icon='newspaper outline'
                text='Реквизиты'
                // onClick={() => highlightFolder({ orgId })}
                onClick={() => setDetails({ id: orgId, type: 'Org' })}
              />
            </Dropdown.Menu>
          </Dropdown>
        </MenuButton>
      }
    </Div>
}
