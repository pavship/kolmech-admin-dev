import React, { Fragment } from 'react'

import { Query  } from 'react-apollo'
import { enquiryLocal } from '../graphql/enquiry'
import { orderLocal } from '../graphql/order'

import { Header } from './styled-semantic/styled-semantic'
import DetailsHeaderSubitle from './DetailsHeaderSubitle'

const settings = {
	Enquiry: {
		titleNew: 'Новая заявка',
		titleExisting: 'Заявка №',
		localQueryName: 'enquiryLocal',
		localQuery: enquiryLocal
	},
	Order: {
		titleNew: 'Новый заказ',
		titleExisting: 'Заказ №',
		localQueryName: 'orderLocal',
		localQuery: orderLocal
	}
}

const DetailsHeaderTitle = ({ type, id, title, subtitle, titleSize }) => {
	const { titleNew, titleExisting, localQueryName, localQuery } = settings[type || 'Enquiry']
	return (
		<Header
			m='0'
			size={titleSize || 'medium'}
		>
			{(type === 'Enquiry' || type === 'Order')
				? (
					id === 'new'
					? titleNew
						// for existing entity get num and dateLocal from cache
					: <Query
							query={localQuery}
							variables={{ id }}
						>
							{({ data }) => {
								if (!(data && data[localQueryName])) return null
								const { num, dateLocal } = data[localQueryName]
								return (
									<Fragment>
										{titleExisting}{num}
										<DetailsHeaderSubitle
											text={'от ' + dateLocal}
										/>
									</Fragment>
								)
							}}
						</Query>
				)
				: <Fragment>
						{title}
						{subtitle &&
							<DetailsHeaderSubitle
								text={subtitle}
							/>
						}
					</Fragment>
			}
		</Header>
	)
}

export default DetailsHeaderTitle
