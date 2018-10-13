import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Section, Caret } from './styled-semantic/styled-semantic'

// const SSection = styled(Section)`
// 	&&& {
// 		${props => props.head && `{
// 			display: flex;
// 			align-items: center;
// 			padding-top: 0;
// 			padding-bottom: 0;
// 		}`}
// 	}
// 	padding: 1em
// `
const SIcon = styled(Icon)`
	&&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`
const RightIcon = styled(Icon)`
	&&& {
		box-sizing: content-box;
		margin: 0 0 0 auto;
	}
`
const SCaret = styled(Caret)`
	&&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`

const DetailsHeaderContainer = ({
	closeDetails,
	closeExtra,
	expanded,
	disabled,
	onClick,
	children
}) => {
	const headerType = 
		!!closeDetails ? 'main' :
		!!closeExtra ? 'extra' :
		'expandable'
	return (
		<Section
			head
			noLP
			noIndent={headerType === 'extra'}
			bottomBorder={headerType === 'extra' ? 'dark' : true}
			// bottomBorder={['expandable', 'extra'].includes(headerType) ? 'dark' : true}
			small={['extra'].includes(headerType)}
			minor={['expandable', 'main'].includes(headerType)}
			// minor={headerType === 'main'}
			// small={['expandable', 'extra'].includes(headerType)}
			onClick={onClick}
		>
			{ headerType === 'main'
				?	<SIcon link
						size='big'
						name='cancel'
						onClick={closeDetails}
					/> :
				// TODO make disabled work (grey out color)
				headerType === 'expandable'
				? <SCaret
						size='large'
						active={expanded ? 1 : 0}
						disabled={disabled}
					/> : null
			}
			{children}
			{ headerType === 'extra'
				? <RightIcon link
						name='cancel'
						onClick={closeExtra}
					/> : null
			}
		</Section>
	)
}

export default DetailsHeaderContainer
