import React, { useState, useRef, useEffect } from 'react'

import { Icon, Dropdown } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic';

export default ({
  // isRowHovered,
  deal,
  orgs,
  upsertDeal,
  upsertingDeal
}) => {
  const { id: dealId, org } = deal
  const orgId = (org && org.id) || 0
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode && inputRef.current &&
    inputRef.current.toggle()) || undefined)
    // const [isHovered, setIsHovered] = useState(false)
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
        // if (orgId !== iniOrgId && orgId !== 0)
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
    return <Icon
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <>
      <Div
        ov='hidden'
        to='ellipsis'
        onClick={() => setEditMode(true)} //block editing
      >
        {org && org.name}
      </Div>

    </>
}
