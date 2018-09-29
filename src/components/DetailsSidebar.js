import React, { Component, Fragment } from 'react'

import { graphql, compose } from 'react-apollo'
import { getLayout, getLayoutOptions, setLayout } from '../graphql/layout'

import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

import Details from './Details';

const SSidebar = styled(Sidebar)`
	background-color: white !important;
	${props => props.type === 'Enquiry' ? `
		width: 65% !important;
		max-width: 680px !important;
	` : `
		width: 65% !important;
		max-width: 1400px !important;
	`}
`

class DetailsSidebar extends Component {
	state = { detailsClosing: false }
	closeDetails = () => {
		this.setState({ detailsClosing: true })
		// set timeout for sidebar to finish animation
		setTimeout(() => {
			this.props.setLayout({variables: { details: null }})
			this.setState({ detailsClosing: false })
		}, 300)
	}
	render() {
		const { layout: { details } } = this.props
		return (
			<SSidebar
				// visible={!!details && !details.closing}
				visible={!!details && !this.state.detailsClosing}
				type={details && details.type}
				animation='overlay'
				direction='right'
			>
				{ details &&
					<Details
						closeDetails={this.closeDetails}
					/>
				}
			</SSidebar>
		)
	}
}

export default compose(
	graphql(getLayout, getLayoutOptions),
	graphql(setLayout, { name: 'setLayout' })
)(DetailsSidebar)