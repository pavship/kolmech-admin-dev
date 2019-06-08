import React, { useContext } from 'react'

import styled from 'styled-components'
import Table from '../common/Table'
import TableRow from '../common/TableRow'
import Batches from './TableCells/Batches'
import Org from './TableCells/Org'
import DetailsContext from '../Details/Provider'
import Deal from './TableCells/Deal'
import { Div } from '../styled/styled-semantic';

const TableHeader = styled.div`
  position: absolute;
  top: -1px;
  left: calc(32px + 650px);
  margin-top: 1px;
  padding: 1px;
  display: flex;
  line-height: 1.5em;
  font-weight: bold;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
`

const fields = [{
  name: 'edit',
	width: '5px'
},{
  name: '#',
  path: 'amoId',
	title: '#',
	width: '80px'
},{
  name: 'date',
  path: 'date',
	title: 'Дата',
	width: '90px'
},{
  name: 'deal',
	title: 'Наименование',
  width: '180px',
  truncated: true
},{
  name: 'counterparty',
  title: 'Контрагент',
  width: '170px',
  truncated: true
},{
  name: 'models',
  path: 'models',
  title: 'Изделие',
  width: '130px'
// },{
//   name: 'qty',
//   title: 'Кол.',
//   width: '40px'
// },{
//   name: 'ops',
//   path: 'ops',
//   title: 'Техпроцесс',
//   width: '140px',
//   truncated: true
// },{
//   name: 'labor',
//   title: 'Н/ч',
//   width: '30px'
// },{
//   name: 'employees',
//   path: 'employees',
//   title: 'Спецы',
//   width: '140px'
// },{
//   name: 'prods',
//   path: 'prods',
//   title: 'Заготовки',
//   width: '200px'
}]

export default ({
  notify,
  deals,
  orgs,
  upsertDeal,
  upsertingDeal,
  // highlightFolder
}) => {
  const { setDetails } = useContext(DetailsContext)
  return <>
    <TableHeader>
      <Div w='40px'>Кол.</Div>
      <Div w='140px'>Техпроцесс</Div>
      <Div w='30px'>Н/ч</Div>
      <Div w='140px'>Исп.</Div>
      <Div w='200px'>Заготовки</Div>
    </TableHeader>
    <Table
      fields={fields}
    >
      {({ tableFields }) =>
        deals.map(deal => {
          const { id } = deal
          return (
            <TableRow
              key={id}
              lightRowHower
              entity={deal}
              tableFields={tableFields}
              rowFields={[
                {
                  name: 'deal',
                  content: <Deal
                    deal={deal}
                    setDetails={setDetails}
                  />,
                  truncated: true
                },
                {
                  name: 'counterparty',
                  content: <Org
                    deal={deal}
                    orgs={orgs}
                    upsertDeal={upsertDeal}
                    upsertingDeal={upsertingDeal}
                    setDetails={setDetails}
                  />,
                  truncated: true
                },
                {
                  name: 'models',
                  content: <Batches
                    notify={notify}
                    deal={deal}
                    upsertDeal={upsertDeal}
                  />,
                }
              ]}
            />
          )
        }
      )}
    </Table>
  </>
}
