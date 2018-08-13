import React from 'react'

import styled from 'styled-components'
import { Header } from 'semantic-ui-react'

import ButtonColoredOnHover from './common/ButtonColoredOnHover'

const MenuDiv = styled.div `
    border-bottom: 1px solid #7e7e81;
`

const MenuHeader = styled(Header) `
    display: inline;
    padding: 0 1rem !important;
`

const MenuButton = styled(ButtonColoredOnHover) `
    margin: .25rem 0 .25rem 0.5rem !important;
    padding: .5rem 1rem !important;
`

const EnquiriesMenu = ({ enquiries, handleEnquiryLineClick }) => {
    return (
        <MenuDiv>
            <MenuHeader content='Заявки и заказы' size='medium'/>
            <MenuButton coloronhover='green' circular icon='plus' content=' Заявка'/>
        </MenuDiv>
    )
}

export default EnquiriesMenu