import React, { useContext } from 'react'

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
  :hover {
    background: rgba(0,0,0,.025);
    color: rgba(0,0,0,.95);
  }
`

export default function Row ({
  isFirstRow,
  deal,
  budgetMode,
}) {
  const { amoId, date, batches, status } = deal
  const { setDetails } = useContext(DetailsContext)
  return <Container>
    <Div
      // w='100%'
      w='max-content'
      pos='relative'
      pe='auto'
    >
      <Div //Header
        d='flex'
        bt={isFirstRow ? undefined : '1px solid rgb(125,125,126)'}
        w='max-content'
        pe='auto'
      >
        <Div //Status
          w='22px'
          m='5px'
          bs='border-box'
          bc={status.color}
        />
        <Div //HeaderContent
          d='flex'
          // bb={batches.length ? '1px solid rgba(34,36,38,0.15);' : undefined}
        >
          <Div //Deal ID
            w='80px'
          >
            {amoId}
          </Div>
          <Div //Deal date
            w='90px'
          >
            {date}
          </Div>
          <Div //Deal name
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
          <Div //Counteragent
            w='111px'
          >
            {deal.org &&
              <Org
                dealId={deal.id}
                org={deal.org}
                setDetails={setDetails}
              />
            }
          </Div>
          {budgetMode &&
            <Div
              w='670px'
            />
          }
        </Div>
        {}
      </Div>
      <Div
        pos={!batches.length ? 'absolute' : undefined}
        t={!batches.length ? '0' : undefined}
        l={!batches.length ? '482px' : undefined}
        w={!batches.length ? '260px' : undefined}
        pl={!batches.length ? '5px' : '32px'}
        bt={batches.length ? '1px solid rgba(34,36,38,0.15)' : undefined}
      >
        <Batches
          deal={deal}
        />
      </Div>
    </Div>
  </Container>
}
