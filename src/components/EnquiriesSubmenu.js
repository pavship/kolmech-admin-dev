import React from 'react'

import styled from 'styled-components'
import { Header, Button } from './styled-semantic/styled-semantic'

import { Query } from 'react-apollo'
import { enquiryLocal } from '../graphql/enquiry'

const SubmenuDiv = styled.div`
    align-self: stretch;
    position: relative;
    margin-left: 10px;
    padding: 0 1em;
    display: flex;
    align-items: center;
    background-color: #f3f4f5;
    ::before {
        position: absolute;
        z-index: 2;
        content: '';
        top: 50%;
        left: 0;
        background-color: #fff;
        width: 1.74em;
        height: 1.74em;
        transform: translateY(-50%) translateX(-50%) rotate(-45deg);
    }
    /* ::after {
        position: absolute;
        z-index: 2;
        content: '';
        top: 50%;
        right: 0;
        background-color: #f3f4f5;
        width: 1.74em;
        height: 1.74em;
        transform: translateY(-50%) translateX(50%) rotate(-45deg);
    } */
`

const EnquiriesSubmenu = ({ item, addNewOrder }) => {
    return (
        <Query query={enquiryLocal} variables={{ id: item.id }}>
            { ({ data }) => {
                console.log('data > ', data)
                if (data && data.enquiryLocal) {
                    const { num } = data.enquiryLocal
                    return (
                        <SubmenuDiv>
                            <Header inline
                                c='rgba(0,0,0,.68)'
                                size='medium'
                                content={`Заявка №${num}`}
                            />
                            <Button compact circular menu
                                ml='0'
                                activeColor='green'
                                icon='plus'
                                content='Заказ'
                                active={
                                    item
                                    && item.type === 'Order'
                                    && item.id === 'new'
                                }
                                onClick={addNewOrder}
                            />
                        </SubmenuDiv>
                    )
                } else return null
            }}
        </Query>
    )
}

export default EnquiriesSubmenu
