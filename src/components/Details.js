import React from 'react'

import { Card } from './styled-semantic/styled-semantic'

import DetailsHeader from './DetailsHeader'
import EnquiryDetails from './EnquiryDetails'
import OrderEdit from './OrderEdit'

import GlobalContext from './special/GlobalContext'

// TODO add delayed unmounting not to break sidebar on animating out 
const Details = ({ closeDetails }) => {
	return (
		<GlobalContext>
			{({ details: { type, id, enquiryId, editMode}, setDetails }) => (
				<Card details fluid>
					<DetailsHeader 
						closeDetails={closeDetails}
					/>
					{type === 'Enquiry'
						? <EnquiryDetails
								id={id}
								closeDetails={closeDetails}
							/>
						:	null
					}
					{type === 'Order' 
						? <OrderEdit
								id={id}
								enquiryId={enquiryId}
								setDetails={setDetails}
							/>
						:	null
					}
				</Card>
			)}
		</GlobalContext>
	)
}

export default Details
