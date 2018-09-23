import React, { Fragment } from 'react'

import { graphql, compose, ApolloConsumer, Query  } from 'react-apollo'
import { enquiryDetails } from '../graphql/enquiry'
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
								? <Query
										query={enquiryDetails}
									>
										{({ refetch }) => (
											<SHeader.Content>
											{		type === 'Enquiry' && id === 'new'
												? 'Новая заявка'
												: type === 'Enquiry' && id !== 'new'
												? <Fragment>
														{`Заявка №${num}`}
														<Span ml='10px' fs='1rem' c='rgba(0,0,0,.6)' ws='0.5em' >
															{`от ${dateLocal}`}
														</Span>
													</Fragment>

											}
											</SHeader.Content>
										)}
									</Query>

							}

							<SHeader.Content>
							{		type === 'Enquiry' && id === 'new'
								? 'Новая заявка'
								: type === 'Enquiry' && id !== 'new'
								? <Fragment>
										{`Заявка №${num}`}
										<Span ml='10px' fs='1rem' c='rgba(0,0,0,.6)' ws='0.5em' >
											{`от ${dateLocal}`}
										</Span>
									</Fragment>

							}
							</SHeader.Content>
						<SHeader.Content>Новый заказ
							{/* { entity.id === 'new' 
								? 'Новый заказ'
								: <Fragment>
									{`Заявка №${num}`}
									<Span ml='10px' fs='1rem' c='rgba(0,0,0,.6)' ws='0.5em' >
										{`от ${dateLocal}`}
									</Span>
								</Fragment> } */}
						</SHeader.Content>
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
