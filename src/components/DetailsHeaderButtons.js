import React from 'react'

import { graphql, compose, Query } from 'react-apollo'
import { enquiryDetails } from '../graphql/enquiry' 

import { Div, Button } from './styled-semantic/styled-semantic'

import RefreshButton from './common/RefreshButton'

// TODO refetch button
const DetailsHeaderButtons = ({ type, id, loading, refresh, editMode, edit }) => {
	return (
		<Div
			ml='auto'
		>
			{/* {	!editMode &&
				<Query
					query={entityQuery}
					variables={{ id }}
				>
					{({ refetch, loading }) => (
						<RefreshButton
							loading={loading}
							onClick={() => refetch()}
						/>
					)}
				</Query>
			} */}
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
// export default compose(
// 	graphql(enquiryDetails, { 
// 		name: 'entityQuery', 
// 		skip: (props) => props.type === 'Order' })
// )(DetailsHeaderButtons)
