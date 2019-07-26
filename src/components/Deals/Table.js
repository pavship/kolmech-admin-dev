import React, { useContext } from 'react'

import { Div } from '../styled/styled-semantic'
import styled from 'styled-components'
import Row from './Row'
import { DealsContext } from './context/Context';

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

const Background = styled(Div)`
  position: fixed;
  height: 100%;
  background: white;
  z-index: -1;
  transition: width .5s ease;
`

export default function DealsTable ({
  deals,
  orgs,
  upsertDeal,
  upsertingDeal,
}) {
  const { budgetMode } = useContext(DealsContext)
  return <Div
    w='100%'
    // h='calc(100% - 36px)'
    h='100%'
    pe='none'
    pos='absolute'
    z='10'
  >
    <TableHeader>
      <Div w='80px'>#</Div>
      <Div w='90px'>Дата</Div>
      <Div w='170px'>Наименование</Div>
      <Div w='170px'>Контрагент</Div>
    </TableHeader>
    <Background
      w={budgetMode ? '1302px' : '632px'}
    />
    <Div
      h='calc(100% - 23px)'
      mt='23px'
      // oy='scroll'
    >
      {deals && deals.map((deal, i) => 
        <Row
          key={deal.id}
          isFirstRow={i === 0}
          deal={deal}
          orgs={orgs}
          upsertDeal={upsertDeal}
          upsertingDeal={upsertingDeal}
        />
      )}
      <Div
        h='400px'
        w='542px'
        bc='white'
      />
    </Div>
  </Div>
}
