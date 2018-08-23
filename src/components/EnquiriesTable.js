import React, { Fragment } from 'react'

import styled from 'styled-components'
import { Label } from 'semantic-ui-react'

const TableHeader = styled.div`
    // padding: 0 14px;
    font-size: 1rem;
    color: rgba(0,0,0,.8);
    background: #f3f4f5;
    border-top: 1px solid #d4d4d5;
    border-bottom: 1px solid #d4d4d5;
`

const Table = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
`

const Tr = styled.tr`

`

const Enquiry = styled.tr`
    font-size: 1rem;
    // font-weight: bold;
    cursor: pointer;
`

const Td = styled.td`
	padding-left: 4px;
    :nth-child(1) {
        width: 40px;
    }
    :nth-child(2) {
        width: 100px;
    }
    :nth-child(3) {
        width: 250px;
    }
    :nth-child(4) {
        width: 80px;
    }
    :nth-child(5) {
        color: #570f0f;
    }
`

const EnquiriesTable = ({ enquiries, handleEnquiryLineClick }) => {
    return (
        <Fragment>
            <TableHeader>
                <Table>
                <tbody>
                    <Tr>
                        <Td>№</Td>
                        <Td>Дата</Td>
                        <Td>Организация</Td>
                        {/* <Td>Сумма КП</Td>
                        <Td>Статус</Td> */}
                    </Tr>
                </tbody>
                </Table>
            </TableHeader>
            <Table>
            <tbody>
                {enquiries.map(({ id, num, dateLocal, message }) => <Fragment key={id}>
                <Enquiry onClick={() => handleEnquiryLineClick(id)}>
                    <Td>{num}</Td>
                    <Td>{dateLocal}</Td>
                    <Td>
                    {/* <Caret name='dropdown' active={activeIndex.includes(name) ? 1 : 0} /> */}
                    {/* {name} <ProdQtyLabel color='grey' basic content={`${prods.length}шт`} /> */}
                    </Td>
                    {/* <Td>15 000 ₽</Td>
                    <Td><Label color='green' basic content={`ниче так`} /></Td> */}
                </Enquiry>
                {/* {activeIndex.includes(name) && prods.map(({ id, fullnumber, time, nTime, cost }) => <Fragment key={id}>
                    <ECProd>
                    <Td>
                        {fullnumber}
                    </Td>
                    <Td>{time}ч</Td>
                    <Td>{nTime || '- '}ч</Td>
                    <Td>{cost || '- '}₽</Td>
                    </ECProd>
                </Fragment>)} */}
                </Fragment>)}
            </tbody>
            </Table>
        </Fragment>
    )
}

export default EnquiriesTable