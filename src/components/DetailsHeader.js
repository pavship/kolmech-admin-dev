import React, { Component } from 'react'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
import DetailsHeaderButtons from './DetailsHeaderButtons'

class DetailsHeader extends Component {
	render() {
		const { expanded, title, onClick } = this.props
		return (
			<DetailsHeaderContainer
				expanded={expanded}
				onClick={onClick}
			>
				<DetailsHeaderTitle
					title={title}
				/>
				{/* { id !== 'new' &&
					<DetailsHeaderButtons
						type={type}
						id={id}
						editMode={editMode || false}
						edit={() => setDetails({type, id, editMode: true})}
					/>
				} */}
			</DetailsHeaderContainer>
		)
	}
}

export default DetailsHeader
