import React from 'react'

import { graphql, compose, Query } from 'react-apollo'
import { enquiryDetails } from '../graphql/enquiry' 

import { Div, Button } from './styled-semantic/styled-semantic'

import RefreshButton from './common/RefreshButton'

const settings = {
	Enquiry: {
		titleNew: 'Новая заявка',
		titleExisting: 'Заявка №',
		entityQueryName: 'enquiryDetails',
		entityQuery: enquiryDetails
	},
	Order: {
		new: 'Новый заказ',
		existing: 'Заказ №'
	}
}

// TODO refetch button
const DetailsHeaderButtons = ({ type, id, editMode, edit }) => {
	const { entityQuery } = settings[type]
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
			<Button
				icon='edit'
				activeColor='blue'
				active={editMode}
				onClick={edit}
			/> 
		</Div>
	)
}

// export default DetailsHeaderButtons
export default compose(
	graphql(enquiryDetails, { 
		name: 'entityQuery', 
		skip: (props) => props.type === 'Order' })
)(DetailsHeaderButtons)
