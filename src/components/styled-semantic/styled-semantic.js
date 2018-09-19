import React from 'react'
import styled from 'styled-components'
import { Header as SHeader, Label as SLabel, Button as SButton, Card } from 'semantic-ui-react'

export const theme = {
	formLabelWidth: '110px', //required
	colors: {
		green: '#016936',
		blue: '#0E6EB8'
	}
}
const getThemeColor = (color) => theme.colors[color] || color
const baseSet = ({ w, m, ml, pl, fs, fw, c, lh, ta, ws }) => {
	return `
		${w ? `width: ${w};`: ''}
		${m ? `margin: ${m};`: ''}
		${ml ? `margin-left: ${ml};`: ''}
		${pl ? `padding-left: ${pl};`: ''}
		${fs ? `font-size: ${fs};`: ''}
		${fw ? `font-weight: ${fw};`: ''}
		${c ? `color: ${c};`: ''}
		${lh ? `line-height: ${lh};`: ''}
		${ta ? `text-align: ${ta};`: ''}
		${ws ? `word-spacing: ${ws};`: ''}
	`
}

export const Div = styled.div`
	${props => props.inline && `display: inline-block;`}
	${props => props.w && `width: ${props.w === 'formLabelWidth' ? `calc(${props.theme.formLabelWidth} + 0.857143em)`: props.w};`}
`

export const P = styled.p`
	${props => baseSet(props)}
`

export const Span = styled.span`
	${props => baseSet(props)}
`

export const A = styled.a`
	${props => props.cancel && `{
		padding-left: 15px;
		color: rgba(0,0,0,.87);
		&:hover {
			color: #B03060;
		}
	}`}
`

const HeaderWithFilteredProps = ({ inline, c, ...rest }) => (
	<SHeader {...rest} />
)
export const Header = styled(HeaderWithFilteredProps)`
	&&& {
		${props => baseSet(props)}
		${props => props.inline && `{
			margin: 0 !important;
			padding: 0 1rem !important;
		}`}
	}
`

export const Label = styled.label`
	width: ${props => props.theme.formLabelWidth} !important;
`

const ButtonWithFilteredProps = ({ activeColor, menu, ...rest }) => (
	<SButton {...rest} />
)
export const Button = styled(ButtonWithFilteredProps)`
	&&&& {
		${props => baseSet(props)}
	}
	&&& {
		&.compact {
			padding: .5rem 1rem;
		}
		${props => props.activeColor && `{
			&:hover {
				color: ${getThemeColor(props.activeColor)} !important;
			}
			&.active {
				color: ${getThemeColor(props.activeColor)} !important;
        	}
		}`}
		${props => props.menu && `{
			margin: .25rem 0 .25rem 0.5rem;
			z-index: 3;
		}`}
	}
`

const CardContentPropFiltered = ({ secondary, minor, head, noIndent, ...rest }) => (
	<Card.Content {...rest} />
)
export const CardSection = styled(CardContentPropFiltered).attrs({
	// head extends minor style
	minor: props => props.minor || props.head
})`
	&&& {
		padding-left: 55px;
		${props => props.secondary && `{
			background: #f3f4f5;
			color: rgba(0,0,0,.6);
		}`}
		${props => props.minor && `{
			padding-top: 0.464286em;
			padding-bottom: 0.464286em;
			min-height: 3.5em;
		}`}
		${props => props.head && `{
			display: flex;
			align-items: center;
		}`}
		${props => props.noIndent && `{
			padding-left: 1em;
		}`}
	}
`
