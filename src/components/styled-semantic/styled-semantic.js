import styled from 'styled-components'
import { Label, Card } from 'semantic-ui-react'

export const theme = {
    formLabelWidth: '130px' //required
}

export const Span = styled.span`
    ${props => props.pl && `padding-left: ${props.pl};`}
    ${props => props.fs && `font-size: ${props.fs};`}
`

export const SLabel = styled.label`
    width: ${props => props.theme.formLabelWidth} !important;
`

export const SCardSection = styled(Card.Content)`
    &&& {
        padding-left: 55px;
        ${props => props.secondary && ` {
            background: #f3f4f5;
            color: rgba(0,0,0,.6);
        }`}

    }
`