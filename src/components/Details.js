import React from 'react'

import { Card } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import DetailsMainHeader from './DetailsMainHeader'
import EnquiryDetails from './EnquiryDetails'
import OrderEdit from './OrderEdit'
import OrderDetails from './OrderDetails'

const Details = ({ closeDetails }) => {
	return (
		<GlobalContext>
			{({ details: { type, id, enquiryId, editMode}, setDetails }) => (
				<Card details fluid>
					<DetailsMainHeader 
						closeDetails={closeDetails}
					/>
					{type === 'Enquiry'
						? <EnquiryDetails
								id={id}
								closeDetails={closeDetails}
							/>
						:	null
					}
					{type === 'Order' &&
						(id === 'new' || editMode
							? <OrderEdit
									id={id}
									enquiryId={enquiryId}
									closeDetails={closeDetails}
									setDetails={setDetails}
								/>
							: <OrderDetails
									id={id}
								/>
						)
					}
				</Card>
			)}
		</GlobalContext>
	)
}

export default Details
