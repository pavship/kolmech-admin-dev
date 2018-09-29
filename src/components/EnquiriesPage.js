import React, { Component, Fragment } from 'react'

import { graphql, compose } from 'react-apollo'
import { getLayout, getLayoutOptions } from '../graphql/layout'
import { allEnquiries } from '../graphql/enquiry'

import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

import EnquiriesMenu from './EnquiriesMenu'
import EnquiriesTable from './EnquiriesTable'
// import Details from './Details'
import DetailsSidebar from './DetailsSidebar'

const Pushable = styled(Sidebar.Pushable)`
	min-height: calc(100vh - 36px) !important;
`

// const DetailsSidebar = styled(Sidebar)`
// 	width: 65% !important;
// 	/* max-width: 680px !important;
// 	background-color: white !important; */
// 	${props => props.type === 'Enquiry' ? `
// 		width: 65% !important;
// 		max-width: 680px !important;
// 	` : `
// 		width: 65% !important;
// 		max-width: 1400px !important;
// 	`}
// `

class EnquiriesPage extends Component {
	// state = { 
	//     detailsVisible: false,
	//     active: null
	// }
	// // Presentational methods
	// openDetails = () => this.setState({ detailsVisible: true })
	// closeDetails = () => {
	//     this.setState({ detailsVisible: false })
	//     // set timeout for sidebar to finish animation
	//     setTimeout(() => this.setState({ active: null }), 300)
	// }
	// // Menu actions
	// refetchEnquiries = () => { this.props.allEnquiries.refetch() }
	// Query actions
	// updateAllEnquiries = (newAllEnquiries) => {
	//     console.log('newAllEnquiries > ', newAllEnquiries)
	//     this.forceUpdate()
	//     // this.props.allEnquiries.updateQuery( _ => (newAllEnquiries))
	// }
	render() {
		const { allEnquiries: { loading, error, refetch, enquiries }, refreshToken, layout: { details } } = this.props
		return (
			<Fragment>
				<EnquiriesMenu
					refetchEnquiries={() => refetch()}
					enquiriesAreLoading={loading}
					refreshToken={refreshToken}
				/>
				{ loading && "Загрузка..."}
				{ error   && `Ошибка ${error.message}`}
				{ !loading && !error && 
					<Pushable>
						<DetailsSidebar />
						{/* <DetailsSidebar
							visible={!!details}
							type={details && details.type}
							animation='overlay'
							direction='right'
						>
							{ details &&
								<Details />
							}
						</DetailsSidebar> */}
						<Sidebar.Pusher>
							<EnquiriesTable 
								enquiries={enquiries}
							/>
						</Sidebar.Pusher>
					</Pushable>
				}
			</Fragment>
		)
	}
}

export default compose(
	graphql(getLayout, getLayoutOptions),
	graphql(allEnquiries, { name: 'allEnquiries' })
)(EnquiriesPage)