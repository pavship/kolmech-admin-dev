import React, { Component, Fragment } from 'react'

import { graphql, compose } from 'react-apollo'
import { getLayout, getLayoutOptions, setLayout } from '../graphql/layout'

import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

import Details from './Details';
import DetailsExtra from './DetailsExtra';

const SSidebar = styled(Sidebar)`
	display: flex;
	background-color: white !important;
	transition: all .5s ease !important;
	${props => `
		&&&&.ui.visible.right.overlay.sidebar {
			transform: translate3d(${props.extra ? '0' : '40%'},0,0);
		}
		${props.type === 'Enquiry'
			? `
				width: 65% !important;
				max-width: 1000px !important;
			` : `
				width: 75% !important;
				max-width: 1200px !important;
			`
			
			
			// (
			// 	!props.extra ? `
			// 		width: 85% !important;
			// 		max-width: 1200px !important;
			// 		// max-width: 780px !important;
			// 	` : `
			// 		width: 85% !important;
			// 		max-width: 1030px !important;
			// 	`
			// )
		}
	`}
`

// const DetailsContainer = styled.div`
// 	display: flex
// 	width: ${props => props.extra ? '100%' : `calc(100% - ${props.theme.widths.extraSidebar})`
// 		width: 100%;
// 		` : `
// 		width: 100%;
// 	`}
// `

class DetailsSidebar extends Component {
	state = { detailsClosing: false }
	closeDetails = () => {
		this.setState({ detailsClosing: true })
		// set timeout for sidebar to finish animation
		setTimeout(() => {
			this.props.setLayout({variables: { details: null, extra: null }})
			this.setState({ detailsClosing: false })
		}, 300)
	}
	closeExtra = () => {
		this.props.setLayout({variables: { extra: null }})
	}
	render() {
		const { detailsClosing } = this.state
		const { layout: { details, extra } } = this.props
		return (
			<SSidebar
				visible={!!details && !detailsClosing}
				extra={!!extra ? 1: 0}
				type={details && details.type}
				animation='overlay'
				direction='right'
			>
				{details &&
					<Fragment>
						<Details
							key={details.type + details.id}
							closeDetails={this.closeDetails}
						/>
						<DetailsExtra
							extra={extra}
							closeExtra={this.closeExtra}
						/>
					</Fragment>
				}
			</SSidebar>
		)
	}
}

export default compose(
	graphql(getLayout, getLayoutOptions),
	graphql(setLayout, { name: 'setLayout' })
)(DetailsSidebar)