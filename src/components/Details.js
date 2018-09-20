import React from 'react'

import { Card } from './styled-semantic/styled-semantic'

import DetailsHeader from './DetailsHeader'
import EnquiryDetails from './EnquiryDetails'
import OrderEdit from './OrderEdit'

const Details = ({ entity, closeDetails, selectEnquiry }) => {
	return (
		<Card details fluid>

			{entity.type === 'Order' && entity.id === 'new' && 
			// TODO make universal header (with render prop buttons)
				<DetailsHeader
					entity={entity}
					closeDetails={closeDetails}
				/>
			}
			{entity.type === 'Enquiry' 
				? 	<EnquiryDetails
						key={entity.id}
						id={entity.id}
						closeDetails={closeDetails}
						selectEnquiry={selectEnquiry} 
					/>
				:	null
			}
			{entity.type === 'Order' 
				? 	<OrderEdit
						id={entity.id}
						entity={entity}
						cancelEdit={this.cancelEdit}
						exitEditMode={this.exitEditMode}
						selectEnquiry={selectEnquiry} 
					/>
				:	null
			}
		</Card>
	)
}

export default Details
