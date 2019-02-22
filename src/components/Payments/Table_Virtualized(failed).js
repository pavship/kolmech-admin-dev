import React from 'react'

import { Table, Column, AutoSizer } from 'react-virtualized'

import styled from 'styled-components'
import { Div } from '../styled/styled-semantic';

const Container = styled.div`
  margin-top: 1rem;
  height: 100%
`

const STable = styled(Table)`
  .ReactVirtualized__Table__headerRow {
    /* height: unset !important; */
    padding-top: 3px;
    line-height: 1.5em;
    vertical-align: middle;
    color: rgba(0,0,0,.8);
    font-weight: bold;
    text-transform: unset;
    background: rgb(233, 234, 235);
    border: 1px solid rgba(34,36,38,.15);
    border-bottom: 1px solid #d4d4d5;
    border-top-left-radius: 0.285714rem;
    border-top-right-radius: 0.285714rem;
  }
  .ReactVirtualized__Table__Grid {
    border: 1px solid rgba(34,36,38,.15);
    border-top: none;
    border-bottom-right-radius: 0.285714rem;
    border-bottom-left-radius: 0.285714rem;
  }
  .ReactVirtualized__Table__row {
    border-bottom: 1px solid #d4d4d5;
  }
`

export default ({
  list
}) => {
  console.log('list > ', list)
  return (
    <Container>
      {/* <Div
        w='100%'
      > */}
      <AutoSizer>
        {({ width, height }) => 
          <STable
            width={width}
            height={height}
            headerHeight={30}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
          >
            <Column
              label='Статья'
              dataKey='article'
              width={100}
            />
            <Column
              width={200}
              label='Сумма'
              dataKey='amount'
            />
          </STable>
        }
      </AutoSizer>
      {/* </Div> */}
    </Container>
  )
}

