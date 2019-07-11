import React, { useState, useContext } from 'react'

import DetailsContext from '../Details/Provider'
import { Div } from '../styled/styled-semantic'
import styled from 'styled-components'
import Org from './TableCells/Org'
import Batches from './TableCells/Batches'
import Deal from './TableCells/Deal'

const Container = styled.div`
  display: flex;
  width: 100%;
  line-height: 1.5em;
  /* border-bottom: 1px solid rgb(211,211,212); */
  :hover {
    background: rgba(0,0,0,.025);
    color: rgba(0,0,0,.95);
  }
`

export default function Row ({
  isFirstRow,
  deal,
  orgs,
  upsertDeal,
  upsertingDeal,
}) {
  // const [ isHovered, setIsHovered ] = useState(false)
  const { amoId, date, batches, status } = deal
  const { setDetails } = useContext(DetailsContext)
  return <Container
    // onMouseEnter={() => setIsHovered(true)}
    // onMouseLeave={() => setIsHovered(false)}
  >
    <Div
      // w='100%'
      w='max-content'
      pos='relative'
      // bc={isHovered ? 'rgb(250,250,250)' : 'white'}
      pe='auto'
      // bb='1px solid rgb(211,211,212)'
    >
      <Div
        d='flex'
        bt={isFirstRow ? undefined : '1px solid rgb(211,211,212)'}
        // bb={batches.length ? '1px solid rgba(34,36,38,0.15);' : undefined}
        w='max-content'
        pe='auto'
      >
        <Div
          w='22px'
          m='5px'
          bs='border-box'
          bc={status.color}
        />
        <Div
          d='flex'
          bb={batches.length ? '1px solid rgba(34,36,38,0.15);' : undefined}
        >
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
  </Container>
}
