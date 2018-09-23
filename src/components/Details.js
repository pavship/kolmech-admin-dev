import React from 'react'

import { Card } from './styled-semantic/styled-semantic'

import DetailsHeader from './DetailsHeader'
import EnquiryDetails from './EnquiryDetails'
import OrderEdit from './OrderEdit'

import GlobalContext from './special/GlobalContext'

// TODO add delayed unmounting not to break sidebar on animating out 
const Details = () => {
	return (
		<GlobalContext>
			{({ details: { type, id, enquiryId, editMode}, setDetails }) => (
				<Card details fluid>
					<DetailsHeader />
					{/* {type === 'Order' && id === 'new' && 
					// TODO make universal header (with render prop buttons)
						<DetailsHeader />
					} */}
					{type === 'Enquiry' 
						? <EnquiryDetails
								// key={id}
								id={id}
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
