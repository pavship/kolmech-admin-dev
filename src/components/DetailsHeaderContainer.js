import React from 'react'

import { Icon } from 'semantic-ui-react'
import { CardSection } from './styled-semantic/styled-semantic'
import styled from 'styled-components'

const SIcon = styled(Icon)`
	&&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`

const DetailsHeaderContainer = ({ closeDetails, children }) => {
	return (
		// @ts-ignore
		<CardSection head noIndent>
				<SIcon link
					size='big'
					name='cancel'
					onClick={closeDetails}
				/>
				{children}
		</CardSection>
	)
}

export default DetailsHeaderContainer
