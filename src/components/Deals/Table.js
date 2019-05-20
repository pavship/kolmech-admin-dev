import React from 'react'

import { NotificationsConsumer } from '../notifications/NotificationsContext'

import Table from '../common/Table'
import TableRow from '../common/TableRow'
import ModelsCell from './TableCells/Models'
import OrgCell from './TableCells/Org'

// import styled from 'styled-components'

// const Container = styled.div`
//   margin-top: 1rem;
//   max-height: 100%;
//   border: 1px solid rgba(34,36,38,.15);
//   border-radius: 0.285714rem;
//   .fz-tableHeaderRow {
//     border-top: none !important;
//   }
// `

const fields = [{
  name: 'edit',
	width: '35px'
},{
  name: '#',
  path: 'amoId',
	title: '#',
	width: '145px'
},{
  name: 'date',
  path: 'date',
	title: 'Дата',
	width: '145px'
},{
  name: 'name',
  path: 'name',
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
  deals,
  orgs,
  models,
}) => {
  //  TODO add CollectionUtils to support sorting
  return (
    // <Container>
    <NotificationsConsumer>
      {({ notify }) =>
        <Table
          fields={fields}
        >
          {({ tableFields }) => 
            deals.map(deal => {
              const { id } = deal
              // const { id, amoId, name, status } = deal
              return (
                <TableRow
                  key={id}
                  entity={deal}
                  tableFields={tableFields}
                  rowFields={[
                    // {
                    //   name: 'edit',
                    //   icon: 'edit',
                    //   iconColor: 'grey',
                    //   hoverable: true,
                    //   hideUnhovered: true,
                    //   hasEntries: false,
                    //   value: ' ',
                    //   onClick: () => onClickRow(id),
                    //   active: activePayment
                    //     && activePayment.id === id
                    // },
                    // {
                    //   name: 'dateLocal',
                    //   value: dateLocal.slice(0,16).replace('T', ' '),
                    // },
                    // {
                    //   name: 'counterparty',
                    //   path: person ? 'person.amoName' : 'org.name',
                    // },
                    {
                      name: 'counterparty',
                      content: <OrgCell
                        notify={notify}
                        deal={deal}
                        orgs={orgs}
                      />,
                      truncated: true
                    },
                    {
                      name: 'models',
                      content: <ModelsCell
                        notify={notify}
                        deal={deal}
                        models={models}
                      />,
                    },
                    // {
                    //   name: 'amount',
                    //   value: isIncome ? amount : -amount,
                    //   color: isIncome ? '#016936' : '#9f3a38'
                    // }
                  ]}
                  // onClick={() => onClickRow(id)}
                />
              )
            }
          )}
        </Table>
      }
    </NotificationsConsumer>
    // </Container>
  )
}
