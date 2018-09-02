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

// const Col = styled.col`
//     :nth-child(1) {
//         width: 10px;
//     }
//     :nth-child(2) {
//         width: 40px;
//     }
//     :nth-child(3) {
//         width: 100px;
//     }
//     :nth-child(4) {
//         width: 250px;
//     }
// `

const Tr = styled.tr`
    
`

const EnquiryRow = styled.tr`
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: rgba(0,0,0,.03);
    }
    // @ts-ignore
    ${props => props.active && `{
        background-color: rgba(0,0,0,.03);
        font-weight: bold;
    }`}
`

const Td = styled.td`
	padding-left: 4px;
    :nth-child(1) {
        width: 10px;
    }
    :nth-child(2) {
        width: 40px;
    }
    :nth-child(3) {
        width: 100px;
    }
    :nth-child(4) {
        width: 350px;
    }
    :nth-child(5) {
        width: 100px;
    }
    :nth-child(6) {

    }
`

const EnquiriesTable = ({ enquiries, activeEnquiryId, handleEnquiryLineClick }) => {
    return (
        <Fragment>
            <TableHeader>
                <Table>
                    {/* <colgroup> <Col /> <Col /> <Col /> <Col /> <Col /> </colgroup> */}
                    <tbody><tr>
                        <Td></Td>
                        <Td>№</Td>
                        <Td>Дата</Td>
                        <Td>Организация</Td>
                        <Td>Статус</Td>
                        <Td></Td>
                        {/* <Td>Сумма КП</Td>
                        <Td>Статус</Td> */}
                </tr></tbody></Table>
            </TableHeader>
            <Table>
                {/* <colgroup> <Col /> <Col /> <Col /> <Col /> <Col /> </colgroup> */}
                <tbody>
                    {enquiries.map(({ id, num, dateLocal, org, events }) => <Fragment key={id}>
                        <EnquiryRow onClick={() => handleEnquiryLineClick(id)} active={id === activeEnquiryId}>
                            <Td></Td>
                            <Td>{num}</Td>
                            <Td>{dateLocal}</Td>
                            <Td>
                                {org && org.name}
                                {/* <Caret name='dropdown' active={activeIndex.includes(name) ? 1 : 0} /> */}
                                {/* {name} <ProdQtyLabel color='grey' basic content={`${prods.length}шт`} /> */}
                            </Td>
                            <Td>{events && events[0].status.name} {events.length}</Td>
                            <Td></Td>
                            {/* <Td>15 000 ₽</Td>*/}
                        </EnquiryRow></Fragment>)}
                </tbody>
            </Table>
        </Fragment>
    )
}

export default EnquiriesTable