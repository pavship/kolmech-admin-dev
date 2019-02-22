import React from 'react'

import styled from 'styled-components'
import { Table } from 'semantic-ui-react';

const STable = styled(Table)`
  th {
    padding-top: .5em !important;
    padding-bottom: .5em !important;
  }
`

export default ({
  payments
}) => {
  //  TODO add CollectionUtils to support sorting
  return (
    <STable
      // sortable
      compact='very'
      celled
      fixed
    >
      <Table.Header>
        <Table.Row>
          {/* <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            onClick={handleSort('name')}
          >
            Дата
          </Table.HeaderCell> */}
          <Table.HeaderCell
            // sorted={column === 'age' ? direction : null}
            // onClick={handleSort('age')}
          >
            Статья
          </Table.HeaderCell>
          <Table.HeaderCell
            // sorted={column === 'gender' ? direction : null}
            // onClick={handleSort('gender')}
          >
            Сумма
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payments.map(({
          id,
          // age,
          article,
          amount
        }) =>
          <Table.Row key={id}>
            {/* <Table.Cell>{name}</Table.Cell> */}
            <Table.Cell>{article.rusName}</Table.Cell>
            <Table.Cell
              textAlign='right'
            >
              {amount}
            </Table.Cell>
          </Table.Row>)
        }
      </Table.Body>
    </STable>
  )
}
