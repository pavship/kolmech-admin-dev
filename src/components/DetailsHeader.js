import React, { Component } from 'react'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
import DetailsHeaderButtons from './DetailsHeaderButtons'

import GlobalContext from './special/GlobalContext'

class DetailsHeader extends Component {
	render() {
		// const { type, entityQuery: { refetch }, entityLocal } = this.props
		const { closeDetails } = this.props
		return (
			<GlobalContext>
				{({ details: { type, id, editMode}, setDetails }) => (
					<DetailsHeaderContainer
						closeDetails={closeDetails}
					>
						<DetailsHeaderTitle
							type={type}
							id={id}
						/>
						{ id !== 'new' &&
							<DetailsHeaderButtons
								type={type}
								id={id}
								editMode={editMode || false}
								edit={() => setDetails({type, id, editMode: true})}
							/>
						}
					</DetailsHeaderContainer>
				)}
			</GlobalContext>
		)
	}
}

export default DetailsHeader

// export default compose(
// 	graphql(enquiryDetails, getLayoutOptions),
// 	graphql(getLayout, getLayoutOptions),
// 	graphql(setLayout, { name: 'setLayout' }),
// 	graphql(enquiryDetails, { name: 'entityQuery', skip: (props) => props.details.id === 'new' })
// )(DetailsHeader)


// const DetailsHeader = () => {
// 	const typeName = 
// 	return (
// 		<GlobalContext>
// 			{({ details: { type, id, editMode, enquiryId }, setDetails }) => (
// 				// @ts-ignore
// 				<CardSection head noIndent>
// 					<Header m='0' >
// 						<Icon link
// 							name='cancel'
// 							onClick={() => setDetails(null)}
// 						/>
// 						{	type === 'Enquiry'
// 							? <SHeader.Content>
// 									{	id === 'new'
// 										? 'Новая заявка'
// 										:	<Query
// 												query={enquiryLocal}
// 												variables={{ id }}
// 											>
// 												{({ data }) => {
// 													if (!data || !data.enquiryLocal) return null
// 													const { num, dateLocal } = data.enquiryLocal
// 													return (
// 														<Fragment>
// 															Заявка №{num}
// 															<Span
// 																ml='10px'
// 																fs='1rem'
// 																c='rgba(0,0,0,.6)'
// 																ws='0.5em'
// 															>
// 																от {dateLocal}
// 															</Span>
// 															{/* { editMode
// 																? 
// 															} */}
// 															{/* <Query
// 																query={enquiryDetails}
// 																variables={ id }
// 																fetchPolicy='cache-only'
// 															>
// 																{({ refetch }) => (

// 																)}
// 															</Query> */}
// 														</Fragment>
// 													)
// 												}}
// 											</Query>
// 									}
// 								</SHeader.Content> :
// 							type === 'Order'
// 							? <SHeader.Content>
// 									Новый заказ
// 								</SHeader.Content>
// 							: null
// 						}
// 					</Header>
// 				</CardSection>
// 			)}
// 		</GlobalContext>
// 	)
// }


// export default compose(
// 	graphql(enquiryDetails, { name: 'enquiryQuery', skip: (props) => props.details.id === 'new' })
// )(DetailsHeader)
