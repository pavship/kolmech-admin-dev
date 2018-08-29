import React, { Component, Fragment } from 'react'

import { Query, graphql, compose } from 'react-apollo'
import { allEnquiries } from '../graphql/enquiry'

import styled from 'styled-components'
import { Sidebar, Button, Container } from 'semantic-ui-react'

import EnquiriesMenu from './EnquiriesMenu'
import EnquiriesTable from './EnquiriesTable'
import EnquiryDetails from './EnquiryDetails'

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
        activeEnquiryId: null 
    }
    selectEnquiry = (id) => this.setState({ activeEnquiryId: id })
    // Presentational methods
    openDetails = () => this.setState({ detailsVisible: true })
    closeDetails = () => {
        this.setState({ detailsVisible: false })
        // set timeout for sidebar to finish animation
        setTimeout(() => this.setState({ activeEnquiryId: null }), 300)
    }
    // Menu actions
    refetchEnquiries = () => {
        const { allEnquiries: { refetch } } = this.props
        refetch()
    }
    addNewEnquiry = () => {
        this.setState({ activeEnquiryId: 'new' })
        this.openDetails()
    }
    // Table actions
    handleEnquiryLineClick = (id) => {
        // console.log('hey, thats a click!', id)
        this.setState({ activeEnquiryId: id })
        this.openDetails()
    }
    render() {
        const { detailsVisible, activeEnquiryId } = this.state
        const { allEnquiries: { loading, error, enquiries }, refreshToken } = this.props
        // if (loading) return "Загрузка..."
		// if (error) return `Ошибка ${error.message}`
        return (
            <Fragment>
                <EnquiriesMenu 
                    refetchEnquiries={this.refetchEnquiries}
                    enquiriesAreLoading={loading}
                    addNewEnquiry={this.addNewEnquiry} 
                    newEnquiryButtonActive={activeEnquiryId === 'new' && detailsVisible}
                    refreshToken={refreshToken} />
                { loading && "Загрузка..."}
                { error   && `Ошибка ${error.message}`}
                { !(loading || error) && 
                    <Pushable>
                        <DetailsSidebar
                            visible={detailsVisible}
                            animation='overlay'
                            direction='right'
                        >
                            { activeEnquiryId &&
                                <EnquiryDetails 
                                    key={activeEnquiryId}
                                    id={activeEnquiryId} 
                                    closeDetails={this.closeDetails} 
                                    selectEnquiry={this.selectEnquiry} /> } 
                        </DetailsSidebar>
                        <Sidebar.Pusher>
                            <EnquiriesTable 
                                enquiries={enquiries}
                                activeEnquiryId={activeEnquiryId}
                                handleEnquiryLineClick={this.handleEnquiryLineClick} />
                        </Sidebar.Pusher>
                    </Pushable>
                }
            </Fragment>
        )
    }
}

export default compose(
    // graphql(assignCurrentEnquiry, { name: 'assignCurrentEnquiry' })
    graphql(allEnquiries, { name: 'allEnquiries' })
)(EnquiriesPage)