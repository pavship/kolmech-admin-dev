import React, { Component, Fragment } from 'react'

import { graphql, compose } from 'react-apollo'
import { getLayout, getLayoutOptions } from '../graphql/layout'
import { allEnquiries } from '../graphql/enquiry'

import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

import EnquiriesMenu from './EnquiriesMenu'
import EnquiriesTable from './EnquiriesTable'
import Details from './Details';

const Pushable = styled(Sidebar.Pushable)`
    min-height: calc(100vh - 36px) !important;
`

const DetailsSidebar = styled(Sidebar)`
    width: 65% !important;
    max-width: 680px !important;
    background-color: white !important;
`

class EnquiriesPage extends Component {
    state = { 
        detailsVisible: false,
        active: null
    }
    selectEnquiry = (id) => this.setState({ active: {type: 'Enquiry', id} })
    // Presentational methods
    openDetails = () => this.setState({ detailsVisible: true })
    closeDetails = () => {
        this.setState({ detailsVisible: false })
        // set timeout for sidebar to finish animation
        setTimeout(() => this.setState({ active: null }), 300)
    }
    // Menu actions
    refetchEnquiries = () => { this.props.allEnquiries.refetch() }
    addNewEnquiry = () => {
        this.setState({ active: {type: 'Enquiry', id: 'new'} })
        this.openDetails()
    }
    addNewOrder = () => {
        this.setState({ active: {type: 'Order',  id: 'new', enquiryId: this.state.active.id } })
        this.openDetails()
    }
    // Query actions
    updateAllEnquiries = (newAllEnquiries) => {
        console.log('newAllEnquiries > ', newAllEnquiries)
        this.forceUpdate()
        // this.props.allEnquiries.updateQuery( _ => (newAllEnquiries))
    }
    // Table actions
    handleEnquiryLineClick = (id) => {
        this.selectEnquiry(id)
        this.openDetails()
    }
    render() {
        const { allEnquiries: { loading, error, enquiries }, refreshToken, layout: { details } } = this.props
        // if (loading) return "Загрузка..."
		// if (error) return `Ошибка ${error.message}`
        return (
            <Fragment>
                <EnquiriesMenu 
                    refetchEnquiries={this.refetchEnquiries}
                    enquiriesAreLoading={loading}
                    addNewEnquiry={this.addNewEnquiry}
                    addNewOrder={this.addNewOrder}
                    activeItem={details}
                    refreshToken={refreshToken} />
                { loading && "Загрузка..."}
                { error   && `Ошибка ${error.message}`}
                { !(loading || error) && 
                    <Pushable>
                        <DetailsSidebar
                            visible={!!details}
                            animation='overlay'
                            direction='right'
                        >
                            { details &&
                                <Details
                                    entity={details}
                                    key={details.type + '-' + details.id}
                                    closeDetails={this.closeDetails}
                                    selectEnquiry={this.selectEnquiry} /> }
                        </DetailsSidebar>
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