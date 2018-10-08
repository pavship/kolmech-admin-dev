import React, { Component } from 'react'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
// import DetailsHeaderButtons from './DetailsHeaderButtons'

class DetailsHeader extends Component {
	render() {
		const { expanded, title, subtitle, titleSize, onClick } = this.props
		return (
			<DetailsHeaderContainer
				expanded={expanded}
				onClick={onClick}
			>
				<DetailsHeaderTitle
					title={title}
					subtitle={subtitle}
					titleSize={titleSize}
				/>
				{/* { id !== 'new' &&
					<DetailsHeaderButtons
						editMode={editMode || false}
						edit={() => setDetails({type, id, editMode: true})}
					/>
				} */}
			</DetailsHeaderContainer>
		)
	}
}

export default DetailsHeader
