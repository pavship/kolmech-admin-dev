import React, { Component, Fragment } from 'react'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import { Sidebar, Button, Container } from 'semantic-ui-react'

import EnquiriesMenu from './EnquiriesMenu'
import EnquiriesTable from './EnquiriesTable'
import EnquiryDetails from './EnquiryDetails'

const Pushable = styled(Sidebar.Pushable) `
    min-height: 100vh !important;
`

const DetailsSidebar = styled(Sidebar) `
    width: 50% !important;
    background-color: white !important;
`

const allEnquiries = gql`
    query {
        enquiries {
            id
            message
        }
    }
`

class EnquiriesPage extends Component {
    state = { detailsVisible: false }
    handleEnquiryLineClick = (id) => {
        console.log('hey, thats a click!', id)
        this.openDetails()
    }
    openDetails = () => this.setState({ detailsVisible: true })
    closeDetails = () => this.setState({ detailsVisible: false })
    toggleDetails = () => this.setState({ detailsVisible: !this.state.detailsVisible })
    render () {
        const { detailsVisible } = this.state
        return (
            <Query query={allEnquiries}>
                {({ data }) => { 
                    return (
                        <Fragment>
                            { data.enquiries && 
                            <Fragment>
                                {/* <Button content={detailsVisible.toString()} onClick={this.toggleDetails} /> */}
                                <EnquiriesMenu />
                                <Pushable>
                                    <DetailsSidebar
                                        visible={detailsVisible}
                                        onHide={this.closeDetails}
                                        animation='overlay'
                                        direction='right'
                                    >
                                        <EnquiryDetails closeDetails={this.closeDetails} />
                                    </DetailsSidebar>
                                    <Sidebar.Pusher>
                                        <EnquiriesTable enquiries={data.enquiries} handleEnquiryLineClick={this.handleEnquiryLineClick} />
                                    </Sidebar.Pusher>
                                </Pushable>
                            </Fragment>}
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default EnquiriesPage