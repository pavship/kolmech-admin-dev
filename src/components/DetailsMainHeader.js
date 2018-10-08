import React, { Component } from 'react'

import { Button } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
import DetailsHeaderButtons from './DetailsHeaderButtons'
import RefreshButton from './common/RefreshButton'

class DetailsMainHeader extends Component {
	render() {
		const { closeDetails, loading, refresh } = this.props
		return (
			<GlobalContext>
				{({ details: { type, id, editMode}, setDetails }) => (
					<DetailsHeaderContainer
						closeDetails={closeDetails}
					>
						<DetailsHeaderTitle
							type={type}
							id={id}
						/>
						{ id !== 'new' &&
							<DetailsHeaderButtons>
								<RefreshButton
									loading={loading}
									onClick={refresh}
								/>
								<Button
									icon='edit'
									activeColor='blue'
									active={editMode || false}
									onClick={() => setDetails({type, id, editMode: true})}
								/> 
							</DetailsHeaderButtons>
						}
					</DetailsHeaderContainer>
				)}
			</GlobalContext>
		)
	}
}

export default DetailsMainHeader
