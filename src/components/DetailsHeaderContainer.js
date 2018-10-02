import React from 'react'

import { Icon } from 'semantic-ui-react'
import { CardSection, Caret } from './styled-semantic/styled-semantic'
import styled from 'styled-components'

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

const DetailsHeaderContainer = ({ closeDetails, expanded, children }) => {
	const headerType = !!closeDetails ? 'main' : 'expandable'
	return (
		<CardSection 
			head
			noIndent
			minor={headerType === 'main'}
			small={headerType === 'expandable'}
		>
			{headerType === 'main'
				?	<SIcon link
						size='big'
						name='cancel'
						onClick={closeDetails}
					/>
				:	<SCaret
						size='large'
						active={expanded ? 1 : 0}
					/>
			}
			{children}
		</CardSection>
	)
}

export default DetailsHeaderContainer
