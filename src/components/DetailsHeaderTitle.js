import React, { Fragment } from 'react'

import { Query  } from 'react-apollo'
import { enquiryLocal } from '../graphql/enquiry'
import { orderLocal } from '../graphql/order'

import { Span, Header } from './styled-semantic/styled-semantic'

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

const DetailsHeaderTitle = ({ type, id, title }) => {
	const { titleNew, titleExisting, localQueryName, localQuery } = settings[type || 'Enquiry']
	return (
		<Header m='0' >
			{(type === 'Enquiry' || type ==='Order') ? (
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
									<Span
										ml='10px'
										fs='1rem'
										c='rgba(0,0,0,.6)'
										ws='0.5em'
									>
										от {dateLocal}
									</Span>
								</Fragment>
							)
						}}
					</Query>
			) : title}
			{/* {type === 'Model' && title } */}
		</Header>
	)
}

export default DetailsHeaderTitle
