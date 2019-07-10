import React, { useContext } from 'react'

import DetailsContext from '../Details/Provider'
import { Div } from '../styled/styled-semantic'
import styled from 'styled-components'
import Org from './TableCells/Org'
import Batches from './TableCells/Batches'
import Deal from './TableCells/Deal'

const TableHeader = styled.div`
  position: fixed;
  display: flex;
  width: 542px;
  padding: 0 0 0 32px;
  line-height: 1.5em;
  font-weight: bold;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
  pointer-events: auto;
  z-index: 15;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  line-height: 1.5em;
  border-bottom: 1px solid rgb(211,211,212);
  :hover {
    background: rgba(0,0,0,.025);
    color: rgba(0,0,0,.95);
  }
`

export default function DealsTable ({
  deals,
  orgs,
  upsertDeal,
  upsertingDeal,
}) {
  const { setDetails } = useContext(DetailsContext)
  return <Div
    h='calc(100% - 36px)'
    // pe='none'
    pos='absolute'
    // top='-23px'
    // top='36px'
    // w='100%'
    z='10'
  >
    <TableHeader>
      <Div w='80px'>#</Div>
      <Div w='90px'>Дата</Div>
      <Div w='170px'>Наименование</Div>
      <Div w='170px'>Контрагент</Div>
    </TableHeader>
    <Div
      h='calc(100% - 23px)'
      mt='23px'
      // oy='scroll'
    >
      {deals && deals.map(deal => {
        const { id, amoId, date, batches, status } = deal
        return <Row
          key={id}
        >
          <Div
            w='max-content'
            pos='relative'
            bc='white'
            pe='auto'
          >
            <Div
              d='flex'
              bb={batches.length ? '1px solid rgba(34,36,38,0.15);' : undefined}
            >
              <Div
                w='22px'
                m='5px'
                bs='border-box'
                bc={status.color}
              />
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
      <Div
        h='400px'
        w='542px'
        bc='white'
      />
    </Div>
  </Div>
}
