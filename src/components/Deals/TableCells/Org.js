import React, { useState } from 'react'

import { Mutation } from 'react-apollo'
import { connectDealToOrg } from '../../../graphql/deal'

import styled from 'styled-components'

import { Icon, Dropdown } from 'semantic-ui-react'

const NameContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ({
  // isRowHovered,
  notify,
  deal,
  orgs,
}) => {
  const [ editMode, setEditMode ] = useState(false)
  const { org } = deal
  const options = orgs
    .map(o => ({key:o.id, value: o.id, text: o.name}))
  return !editMode
    ? !!org
      ? <NameContainer>
          {org.name}
        </NameContainer>
      : <Icon
          link
          name='plus'
          onClick={() => setEditMode(true)}
        />
    : <Mutation
        mutation={connectDealToOrg}
        onCompleted={(res) => console.log('res > ', res) || notify({
          type: 'success',
          title: 'Организация привязана к сделке'
        })}
        onError={err => notify({
          type: 'error',
          title: 'Ошибка. Организация не привязана к сделке',
          content: err.message,
        })}
        // update={(cache, { data: { connectDealToOrg } }) => {
        //   const { deals } = cache.readQuery({ query: dealsPage })
        //   cache.writeQuery({
        //     query: dealsPage,
        //     data: {
        //       deals: produce(deals, draft => {
        //         const foundIndex = deals.findIndex(d => d.id === connectDealToOrg.id)
        //         foundIndex !== -1
        //           ? draft.splice(foundIndex, 1, connectDealToOrg)
        //           : draft.unshift(connectDealToOrg)
        //       })
        //     }
        //   })
        // }}
        // update={(cache, { data: { connectDealToOrg: data } }) => {
        //   const id = `Deal:${deal.id}`
        //   const fragment = dealFragmentMiddle
        //   cache.writeFragment({ id, fragment, data, fragmentName: 'DealFragmentMiddle' })
        // }}
      >
        {(connectDealToOrg, { loading: connectingDealToOrg }) =>
          <Dropdown
            disabled={connectingDealToOrg}
            loading={connectingDealToOrg}
            options={options}
            value={org && org.id}
            onBlur={() => setEditMode(false)}
            onChange={async (e, { value: orgId }) => {
              await connectDealToOrg({
                variables: { orgId, dealId: deal.id }
              })
              setEditMode(false)
            }}
            search
            // searchQuery={orgDdn.search}
            selection //required when allowAdditions
            selectOnBlur={false}
            selectOnNavigation={false}
            // onSearchChange={this.handleOrgDropdownSearchChange}
            noResultsMessage='Если не найдено, добавьте организацию на странице Платежи'
            // noResultsMessage='Если не найдено, введите наименование Изделия, чтобы добавить.'
            // allowAdditions
            // additionLabel='Добавить по ИНН: '
            // onAddItem={this.createOrg}
          />
        }
      </Mutation>
}