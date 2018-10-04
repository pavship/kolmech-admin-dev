import React from 'react'

import { Div, Button } from './styled-semantic/styled-semantic'

import RefreshButton from './common/RefreshButton'

const DetailsHeaderButtons = ({ loading, refresh, editMode, edit }) => {
	return (
		<Div
			ml='auto'
		>
			<RefreshButton
				loading={loading}
				onClick={refresh}
			/>
			<Button
				icon='edit'
				activeColor='blue'
				active={editMode}
				onClick={edit}
			/> 
		</Div>
	)
}

export default DetailsHeaderButtons
