import React from 'react'
import styled from 'styled-components'
import { 
	Header as SHeader, 
	// Label as SLabel, 
	Button as SButton, 
	Card as SCard,
	Popup as SPopup,
	Dropdown as SDropdown
} from 'semantic-ui-react'

export const theme = {
	widths: {
		formLabel: '122px', //required calc(110px + 0.857143em)
		detailsPL: '55px'
	},
	colors: {
		green: '#016936',
		blue: '#0E6EB8'
	}
}
const getThemeColor = (color) => theme.colors[color] || color
const baseSet = ({ theme, w, m, ml, pl, fs, fw, c, lh, ta, ws }) => {
	return `
		${w ? `width: ${theme.widths[w] || w};`: ''}
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

const DivWithFilteredProps = ({ ml, ...rest }) => (
	<div {...rest} />
)
export const Div = styled(DivWithFilteredProps)`
	${props => props.inline && `display: inline-block;`}
	${props => baseSet(props)}
`

const PWithFilteredProps = ({ ...rest }) => (
	<p {...rest} />
)
export const P = styled(PWithFilteredProps)`
	${props => baseSet(props)}
`

const SpanWithFilteredProps = ({ ml, ...rest }) => (
	<span {...rest} />
)
export const Span = styled(SpanWithFilteredProps)`
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
	&&&& {
		${props => baseSet(props)}
	}
	&&& {
		${props => props.inline && `{
			margin: 0;
			padding: 0 1rem;
		}`}
	}
`

export const Label = styled.label`
	width: ${props => props.theme.widths.formLabel} !important;
	margin-right: 0 !important;
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

const CardWithFilteredProps = ({ details, ...rest }) => (
	<SCard {...rest} />
)
export const Card = styled(CardWithFilteredProps)`
	&&&& {
		${props => baseSet(props)}
	}
	&&& {
		${props => props.details && `{
			border-radius: 0;
			box-shadow: none;
		}`}
	}
`

const CardContentPropFiltered = ({ secondary, minor, head, noIndent, ...rest }) => (
	<SCard.Content {...rest} />
)
export const CardSection = styled(CardContentPropFiltered).attrs({
	// head extends minor style and has noIndent
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
			padding-left: 0;
		}`}
	}
`

const PopupWithFilteredProps = ({ showIf, ...rest }) => (
	<SPopup {...rest} />
)
export const Popup = styled(PopupWithFilteredProps)`
	&&& {
		${props => !props.showIf && `{
			opacity: 0;
		}`}
	}
`

export const Dropdown = styled(SDropdown)`
	&&&&&& {
		width: 350px;
		&:hover {
			border-color: rgba(34, 36, 38, 0.15);
		}
	}
`
