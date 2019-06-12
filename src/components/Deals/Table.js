import React, { useContext } from 'react'

import styled from 'styled-components'
// import Table from '../common/Table'
// import TableRow from '../common/TableRow'
import Batches from './TableCells/Batches'
import Org from './TableCells/Org'
import DetailsContext from '../Details/Provider'
import Deal from './TableCells/Deal'
import { Div } from '../styled/styled-semantic'

const TableHeader = styled.div`
  /* position: absolute;
  top: -1px;
  left: 32px;
  margin-top: 1px; */
  display: flex;
  /* width: max-content; */
  width: 100%;
  /* padding: 1px 0 1px 32px; */
  padding: 0 0 0 32px;
  line-height: 1.5em;
  font-weight: bold;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
`

const Row = styled.div`
  display: flex;
  /* padding: 1px 0; */
  /* width: max-content; */
  width: 100%;
  line-height: 1.5em;
  border-bottom: 1px solid rgba(34,36,38,0.15);
  :hover {
    background: rgb(250,250,250);
    color: rgba(0,0,0,.95);
  }
`

// const DealHeader = styled.div`
//   display: flex;
//   border-bottom: 1px solid rgba(34,36,38,0.15);
// `

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

export default function DealsTable ({
  notify,
  deals,
  orgs,
  upsertDeal,
  upsertingDeal,
  // highlightFolder
}) {
  const { setDetails } = useContext(DetailsContext)
  return <>
    <TableHeader>
      <Div w='80px'>#</Div>
      <Div w='90px'>Дата</Div>
      <Div w='170px'>Наименование</Div>
      <Div w='170px'>Контрагент</Div>
      {/* <Div w='130px'>Изделие</Div>
      <Div w='40px'>Кол.</Div>
      <Div w='140px'>Техпроцесс</Div>
      <Div w='30px'>Н/ч</Div>
      <Div w='140px'>Исп.</Div>
      <Div w='200px'>Заготовки</Div> */}
    </TableHeader>
    {deals && deals.map(deal => {
      const { id, amoId, date, batches } = deal
      return <Row
        key={id}
      >
        <Div
          w='max-content'
          pos='relative'
        >
          <Div
            d='flex'
            ml='32px'
            bb={batches.length ? '1px solid rgba(34,36,38,0.15);' : undefined}
            // pb={batches.length ? '1px;' : undefined}
          >
            {/* <Div
              w='32px'
            /> */}
            <Div
              w='80px'
            >
              {amoId}
            </Div>
            <Div
              w='90px'
            >
              {date}
            </Div>
            <Div
              w='170px'
              whs='nowrap'
              to='ellipsis'
              pos='relative'
            >
              <Deal
                deal={deal}
                setDetails={setDetails}
              />
            </Div>
            <Div
              w='170px'
              whs='nowrap'
              to='ellipsis'
              pos='relative'
            >
              <Org
                deal={deal}
                orgs={orgs}
                upsertDeal={upsertDeal}
                upsertingDeal={upsertingDeal}
                setDetails={setDetails}
              />
            </Div>
          </Div>
          <Div
            pos={!batches.length ? 'absolute' : undefined}
            t={!batches.length ? '0' : undefined}
            l={!batches.length ? '552px' : undefined}
            pl={!batches.length ? '5px' : '32px'}
          >
            <Batches
              deal={deal}
              upsertDeal={upsertDeal}
            />
          </Div>
        </Div>
      </Row>
    })}
    {/* <Table
      fields={fields}
    >
      {({ tableFields }) =>
        deals && deals.map(deal => {
          const { id, amoId, date } = deal
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
                    deal={deal}
                    upsertDeal={upsertDeal}
                  />,
                }
              ]}
            />
          )
        }
      )}
    </Table> */}
  </>
}
