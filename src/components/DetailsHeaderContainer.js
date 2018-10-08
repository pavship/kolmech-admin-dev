import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Section, Caret } from './styled-semantic/styled-semantic'

const SIcon = styled(Icon)`
	&&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`
const SCaret = styled(Caret)`
	&&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`

const DetailsHeaderContainer = ({ closeDetails, expanded, disabled, onClick, children }) => {
	const headerType = !!closeDetails ? 'main' : 'expandable'
	return (
		<Section
			head
			noIndent
			bottomBorder
			minor={headerType === 'main'}
			small={headerType === 'expandable'}
			onClick={onClick}
		>
			{headerType === 'main'
				?	<SIcon link
						size='big'
						name='cancel'
						onClick={closeDetails}
					/>
				// TODO make disabled work (grey out color)
				:	<SCaret
						size='large'
						active={expanded ? 1 : 0}
						disabled={disabled}
					/>
			}
			{children}
		</Section>
	)
}

export default DetailsHeaderContainer
