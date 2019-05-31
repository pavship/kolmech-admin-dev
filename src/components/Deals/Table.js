import React, { useContext } from 'react'

import Table from '../common/Table'
import TableRow from '../common/TableRow'
import Batches from './TableCells/Batches'
import Org from './TableCells/Org'
import DetailsContext from '../Details/Provider'
import Deal from './TableCells/Deal'

const fields = [{
  name: 'edit',
	width: '5px'
},{
  name: '#',
  path: 'amoId',
	title: '#',
	width: '90px'
},{
  name: 'date',
  path: 'date',
	title: 'Дата',
	width: '80px'
},{
  name: 'deal',
	title: 'Наименование',
  width: '180px',
  truncated: true
},{
  name: 'counterparty',
  title: 'Контрагент',
  width: '200px',
  truncated: true
},{
  name: 'models',
  path: 'models',
  title: 'Изделие',
  width: '170px'
},{
  name: 'ops',
  path: 'ops',
  title: 'Техпроцесс',
  width: '170px',
  truncated: true
},{
  name: 'employees',
  path: 'employees',
  title: 'Спецы',
  width: '140px'
},{
  name: 'prods',
  path: 'prods',
  title: 'Заготовки',
  width: '200px'
}]

export default ({
  notify,
  deals,
  orgs,
  upsertDeal,
  upsertingDeal,
  // highlightFolder
}) => {
  const { details, setDetails } = useContext(DetailsContext)
  return (
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
  )
}
