// this is extended semantic ui Button with colorOnHover prop

import React from 'react'

import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const ColoredOnHoverButton = styled(Button)`
    ${props => props.coloronhover && `
        &:hover {
            color: ${props.coloronhover} !important;
        }
    `}
`

const ButtonColoredOnHover = (props) => {
    return (
        <ColoredOnHoverButton {...props}>
            {props.children}
        </ColoredOnHoverButton>
    )
}

export default ButtonColoredOnHover