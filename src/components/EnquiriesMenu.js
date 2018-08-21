import React from 'react'

import styled from 'styled-components'
import { Header, Icon } from 'semantic-ui-react'

import ButtonColoredOnHover from './common/ButtonColoredOnHover'

const MenuDiv = styled.div`
    border-bottom: 1px solid #7e7e81;
`

const MenuHeader = styled(Header)`
    display: inline;
    padding: 0 1rem !important;
`

const MenuButton = styled(ButtonColoredOnHover)`
    && {
        margin: .25rem 0 .25rem 0.5rem;
        padding: .5rem 1rem;
    }
`

const LoadButton = MenuButton.extend`
    ${props => props.increaserightpadding && `
        padding-right: calc(14px + 9.125px) !important;
    `}
`

const EnquiriesMenu = ({ refetchEnquiries, enquiriesAreLoading, addNewEnquiry, newEnquiryButtonActive }) => {
    return (
        <MenuDiv>
            <MenuHeader content='Заявки и заказы' size='medium' />
            <LoadButton coloronhover='blue' circular onClick={refetchEnquiries} increaserightpadding={enquiriesAreLoading ? 1: 0}>
                <Icon name='refresh' loading={enquiriesAreLoading} color={enquiriesAreLoading ? 'blue' : undefined} />
                {enquiriesAreLoading ? 'Загрузка' : 'Обновить'}
            </LoadButton>
            <MenuButton coloronhover='green' circular icon='plus' content=' Заявка'
                onClick={addNewEnquiry} active={newEnquiryButtonActive} />
        </MenuDiv>
    )
}

export default EnquiriesMenu