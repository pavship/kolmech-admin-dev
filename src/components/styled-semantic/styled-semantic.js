import React from 'react'
import styled from 'styled-components'
import { Label, Card } from 'semantic-ui-react'

export const theme = {
    formLabelWidth: '110px' //required
}

export const Div = styled.div`
    ${props => props.inline && `display: inline-block;`}
    ${props => props.w && `width: ${props.w === 'form-label' ? `calc(${props.theme.formLabelWidth} + 0.857143em)`: props.w};`}
`

export const Span = styled.span`
    ${props => props.pl && `padding-left: ${props.pl};`}
    ${props => props.fs && `font-size: ${props.fs};`}
    word-spacing: 0.1em;
`

export const SLabel = styled.label`
    width: ${props => props.theme.formLabelWidth} !important;
`

const CardContentPropFiltered = ({ secondary, minor, head, noIndent, ...rest }) => (
    <Card.Content {...rest} />
)
export const SCardSection = styled(CardContentPropFiltered).attrs({
    minor: props => props.minor || props.head
})`
    &&& {
        padding-left: 55px;
        ${props => props.secondary && ` {
            background: #f3f4f5;
            color: rgba(0,0,0,.6);
        }`}
        ${props => props.minor && ` {
            padding-top: 0.464286em;
            padding-bottom: 0.464286em;
            min-height: 3.5em;
        }`}
        ${props => props.head && ` {
            display: flex;
	        align-items: center;
        }`}
        ${props => props.noIndent && ` {
            padding-left: 1em;
        }`}
    }
`
