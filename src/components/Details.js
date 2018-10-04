import React from 'react'

import { Card } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import DetailsMainHeader from './DetailsMainHeader'
import EnquiryDetails from './EnquiryDetails'
import OrderEdit from './OrderEdit'
import OrderDetails from './OrderDetails'
import DetailsDataProvider from './DetailsDataProvider';

const Details = ({ closeDetails }) => {
	return (
		<GlobalContext>
			{({ details: { type, id, enquiryId, editMode}, setDetails }) => (
				<DetailsDataProvider
					type={type}
					id={id}
				>
					{({ loading, error, refetch, entity }) =>
						<Card details fluid>
							<DetailsMainHeader 
								closeDetails={closeDetails}
								refetch={() => refetch()}
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
									: (entity && 
											<OrderDetails
												order={entity}
											/>
										)
								)
							}
						</Card>
					}
				</DetailsDataProvider>
			)}
		</GlobalContext>
	)
}

export default Details
