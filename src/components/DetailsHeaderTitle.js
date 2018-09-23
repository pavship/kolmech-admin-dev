import React, { Fragment } from 'react'

import { Query  } from 'react-apollo'
import { enquiryLocal } from '../graphql/enquiry'

import { Span, Header } from './styled-semantic/styled-semantic'

const settings = {
	Enquiry: {
		titleNew: 'Новая заявка',
		titleExisting: 'Заявка №',
		localQueryName: 'enquiryLocal',
		localQuery: enquiryLocal
	},
	Order: {
		new: 'Новый заказ',
		existing: 'Заказ №'
	}
}

const DetailsHeaderTitle = ({ type, id }) => {
	const { titleNew, titleExisting, localQueryName, localQuery } = settings[type]
	return (
		<Header m='0' >
			{ id === 'new' &&
				titleNew
			}
			{ id !== 'new' &&
				// for existing entity get num and dateLocal from cache
				<Query
					query={localQuery}
					variables={{ id }}
				>
					{({ data }) => {
						console.log('data > ', data)
						if (!data || !data[localQueryName]) return null
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
			}
		</Header>
	)
}

export default DetailsHeaderTitle
