import React, { Fragment } from 'react'

import { graphql, compose, ApolloConsumer, Query  } from 'react-apollo'
import { enquiryDetails, enquiryLocal } from '../graphql/enquiry'
import GlobalContext from './special/GlobalContext'

import { Header as SHeader, Icon } from 'semantic-ui-react'
import { Span, Header, CardSection } from './styled-semantic/styled-semantic'

const DetailsHeader = () => {
	return (
		<GlobalContext>
			{({ details: { type, id, editMode, enquiryId }, setDetails }) => (
				// @ts-ignore
				<CardSection head noIndent>
					<Header m='0' >
						<Icon link
							name='cancel'
							onClick={() => setDetails(null)}
						/>
						{	type === 'Enquiry'
							? <SHeader.Content>
									{	id === 'new'
										? 'Новая заявка'
										:	<Query
												query={enquiryLocal}
												variables={{ id }}
											>
												{({ data }) => {
													if (!data || !data.enquiryLocal) return null
													const { num, dateLocal } = data.enquiryLocal
													return (
														<Fragment>
															Заявка №{num}
															<Span
																ml='10px'
																fs='1rem'
																c='rgba(0,0,0,.6)'
																ws='0.5em'
															>
																от {dateLocal}
															</Span>
															{/* { editMode
																? 
															} */}
															{/* <Query
																query={enquiryDetails}
																variables={ id }
																fetchPolicy='cache-only'
															>
																{({ refetch }) => (

																)}
															</Query> */}
														</Fragment>
													)
												}}
											</Query>
									}
								</SHeader.Content> :
							type === 'Order'
							? <SHeader.Content>
									Новый заказ
								</SHeader.Content>
							: null
						}
					</Header>
				</CardSection>
			)}
		</GlobalContext>
	)
}

export default DetailsHeader
// export default compose(
// 	graphql(enquiryDetails, { name: 'enquiryQuery', skip: (props) => props.details.id === 'new' })
// )(DetailsHeader)
