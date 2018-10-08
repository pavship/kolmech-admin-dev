import React, { Fragment } from 'react'

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
						<Fragment>
							<DetailsMainHeader 
								closeDetails={closeDetails}
								loading={loading}
								refresh={() => refetch()}
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
						</Fragment>
					}
				</DetailsDataProvider>
			)}
		</GlobalContext>
	)
}

export default Details
