import React, { Component } from 'react'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
import DetailsHeaderButtons from './DetailsHeaderButtons'

import GlobalContext from './special/GlobalContext'

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
							<DetailsHeaderButtons
								loading={loading}
								refresh={refresh}
								editMode={editMode || false}
								edit={() => setDetails({type, id, editMode: true})}
							/>
						}
					</DetailsHeaderContainer>
				)}
			</GlobalContext>
		)
	}
}

export default DetailsMainHeader
