import React from 'react'

import { Icon } from 'semantic-ui-react'
import { Header, CardSection } from './styled-semantic/styled-semantic'

const DetailsHeaderContainer = ({ closeDetails, children }) => {
	return (
		// @ts-ignore
		<CardSection head noIndent>
			<Header m='0' >
				<Icon link
					name='cancel'
					onClick={closeDetails}
				/>
				{children}
			</Header>
		</CardSection>
	)
}

export default DetailsHeaderContainer
