import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Header, Icon, Label, Form, Comment, Button, Message } from 'semantic-ui-react'

import { graphql, compose } from 'react-apollo'
import { enquiry, newEnquiry, createEnquiryEvent, enquiryFragment } from '../graphql/enquiry'

import EnquiryEdit from './EnquiryEdit'
import ButtonColoredOnHover from './common/ButtonColoredOnHover'
import DraftEditor from './common/DraftEditor'
import { sanitize } from 'dompurify'

import ErrorBoundary from './common/ErrorBoundary'

const ECard = styled(Card)`
    border-radius: 0 !important;
    box-shadow: none !important;
`

const ECardTop = styled(Card.Content)`
    display: flex;
	align-items: center;
    height: 3.5em;
`

const EHeader = styled(Header)`
    margin: 0 !important;
`

const SHeader = styled.span`
	margin-left: 10px;
	font-size: 1rem;
	color: rgba(0,0,0,.6);
	word-spacing: 0.5em;
`

const EIcon = styled(Icon)`
    cursor: pointer;
`

const ReloadButton = styled(ButtonColoredOnHover)`
    margin-left: auto !important;
    padding: .78571429em !important;
    &>i {
        opacity: .9 !important;
        margin: 0 !important;
    }
`

const EditButton = styled(ButtonColoredOnHover)`
    ${props => props.withmargin && 'margin-left: auto !important;'}
`

const ECardBody = styled(Card.Content)`
    padding-left: 55px !important;
`

const Table = styled.table`
    /* table-layout: fixed; */
    width: 100%;
    border-collapse: collapse;
`

const Tr = styled.tr`
	margin: 0 0 1em;
	line-height: 1.4285em;
	color: rgba(0,0,0,.87);
`

const Td = styled.td`
	padding-left: 4px;
	:nth-child(1) {
        /* width: 150px; */
		// color: rgba(0,0,0,.87);
		/* font-size: .92857143em; */
		/* line-height: 32px; */
        line-height: 1.21428571em;
        padding: .67857143em 0;
        vertical-align: top;
	}
	:nth-child(2) {
        // width: 100px;
		font-size: 1em;
		font-weight: bold;
        line-height: 1.21428571em;
		padding: .67857143em 1em;
	}
`
    
const Comments = styled(Comment.Group)`
    margin: 1.5em 1.5em 1.5em 55px !important;
`

const CIcon = styled(Icon)`
    // apply horizontal offset correction for different icons to be vertically alined
	width: ${props => (props.type === 'CREATE') ? '1.73em' : '1.4em' } !important;
    ${props => (props.type === 'CREATE') && 'margin-left: -0.33em !important;'}
	margin-top: .15em !important;
    float: left;
    opacity: 0.6 !important;
`

const UserLabel = styled(Label)`
	width: 2em;
	height: 2em;
	margin-left: 0 !important;
	padding: .4em 0em !important;
	float: left;
    text-align: center;
    ${props => props.indent && 'margin-left: 42.69px !important;'}
    // ${props => props.indent && 'margin-left: calc(1.4em + 0.25rem) !important;'}
`

const CContent = styled(Comment.Content)`
	margin-left: 6.5em !important;
`

const CMetadata = styled(Comment.Metadata)`
	color: rgba(0,0,0,.6) !important;
`

const CText = styled(Comment.Text)`
    &>p { margin: 0 !important; }
    &>table { 
        width: 100%;
        border-collapse: collapse; 
    }
    &>table>tbody>tr>td {
        padding-left: 4px;
        vertical-align: top;
    }
    &>table>tbody>tr>td:nth-child(1) {
        width: 5px;
    }
    &>table>tbody>tr>td:nth-child(2) {
        width: 25px;
        min-width: 90px;
    }
    &>table>tbody>tr>td:nth-child(3) {
        padding-left: 10px;
        width: 1000px;
        min-width: 240px;
    }
    &>table>tbody>tr>td>span {
        margin-right: 5px;
    }
`

const StyledEditorWrapper = styled.div`
    padding: .78571429em 1em;
    margin: 0 0 1em 6.35em;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
    transition: color .1s ease,border-color .1s ease;
    line-height: 1.2857;
`
const CMessage = styled(Message)`
    margin-left: 6.35em !important;
`
    
class EnquiryDetails extends Component {
    isNewEnquiry = this.props.id === 'new'
    editorRef = React.createRef()
	state = {
		editMode: this.isNewEnquiry ? true : false,
        creatingComment: false,
        editorHasText: false,
        error: '',
        loading: false
    }
    refetchEnquiry = async () => {
        this.setState({ loading: true })
        const res = await this.props.enquiryQuery.refetch()
        this.setState({ loading: false })
    }
    enableEditMode = () => this.setState({ editMode: true })
    exitEditMode = () => this.setState({ editMode: false })
    setEditorHasText = (bool) => this.setState({ editorHasText: bool })
    cancelEdit = () => {
        if (this.isNewEnquiry) return this.props.closeDetails()
        this.exitEditMode()
	}
	createComment = async () => {
        try {
            const htmlText = this.editorRef.current.exportHtml()
            if (htmlText === '<p><br></p>') return
            this.setState({creatingComment: true})
            await this.props.createEnquiryEvent({
                variables: {
                    enquiryId: this.props.id,
                    htmlText
                }
            })
            // console.log('componentRef > ', this.refs.componentRef)
            // setTimeout(()=>console.log('componentRef after tmeout > ', this.refs.componentRef), 3000)
            // if (!this.refs.componentRef) return
            this.setState({ creatingComment: false, editorHasText: false, error: '' })
            this.editorRef.current.clear()
        } catch(err) {
            // if (!this.refs.componentRef) return
            this.setState({ creatingComment: false, error: err.message })
            console.log(err)
        }
    }
	render() { 
        // console.log(this.state, this.props);
		const { editMode, creatingComment, editorHasText, error, loading } = this.state
		const { id, enquiryQuery, closeDetails, selectEnquiry } = this.props
        const isNewEnquiry = this.isNewEnquiry
		if (enquiryQuery.loading) return "Загрузка..."
        if (enquiryQuery.error) return `Ошибка ${enquiryQuery.error.message}`
        const enquiry = isNewEnquiry ? enquiryQuery.newEnquiry : enquiryQuery.enquiry
        const { num, dateLocal, org, events } = enquiry
		return (
            <ErrorBoundary>
			<ECard fluid>
				<ECardTop>
					<EHeader>
						<EIcon name='cancel' onClick={closeDetails} />
						<Header.Content>
							{ isNewEnquiry 
                              ? 'Новая заявка' 
                              : <Fragment>
                                    {`Заявка №${num}`}
                                    <SHeader>{`от ${dateLocal}`}</SHeader>
                                </Fragment> }
						</Header.Content>
					</EHeader>
                    { !editMode &&
                        <ReloadButton coloronhover='blue' 
                            active={loading} 
                            onClick={this.refetchEnquiry} >
                            <Icon name='refresh' 
                                loading={loading} /></ReloadButton> }
                    { !isNewEnquiry &&
                        <EditButton icon='edit' 
                            coloronhover='blue' 
                            active={editMode} 
                            withmargin={editMode ? 1 : 0} 
                            onClick={this.enableEditMode} /> }
				</ECardTop>
				{ (editMode || isNewEnquiry) &&
                    <EnquiryEdit id={id} 
                        enquiry={enquiry} 
                        cancelEdit={this.cancelEdit} 
                        exitEditMode={this.exitEditMode} 
                        selectEnquiry={selectEnquiry} /> }
				{ !(editMode || isNewEnquiry) && <Fragment>
					<ECardBody>
						<Table><tbody>
							<Tr>
								<Td>Организация</Td>
								<Td>{org && org.name}</Td>
                                <Td></Td>
							</Tr>
							<Tr>
								<Td>Статус</Td>
								<Td>{events[0].status.name}</Td>
                                <Td></Td>
							</Tr>
						</tbody></Table>
					</ECardBody>
                    
					<Comments minimal>
						<Header as='h3' dividing content='Комментарии и события' />
                        { events.map(e => {
							const { fName, lName } = e.user.person
							const userInitials = (lName ? fName.slice(0,1) : fName.slice(0,2)) + (lName ? lName.slice(0,1) : '')
                            return (
								<Comment key={e.id}>
									{ e.type &&
									<CIcon 
                                        size='big' type={e.type}
                                        color={e.type === 'CREATE' ? 'green' : 
                                                          'UPDATE' ? 'blue' : 'brown'}
                                        name ={e.type === 'CREATE' ? 'plus' : 
                                                          'UPDATE' ? 'edit' : 'question'} /> }
									<UserLabel 
										size='big' 
										content={userInitials}
										indent={!e.type ? 1 : 0} />
									{/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
									<CContent>
										<Comment.Author 
											as='span' 
											content={fName + ' ' + lName} />
										<CMetadata
											content={e.datetimeLocal.slice(0,16)} />
										<CText dangerouslySetInnerHTML={{__html: sanitize(e.htmlText)}} />
										{/* <Comment.Actions
											content={( <a>Reply</a> )} /> */}
									</CContent>
								</Comment>
                            )
                        })}
						<Form reply error={!!error}>
							<StyledEditorWrapper>
                                <DraftEditor ref={this.editorRef} 
                                    setEditorHasText={this.setEditorHasText}
                                    createComment={this.createComment} />
                            </StyledEditorWrapper>
                            <CMessage
                                error
                                header='Коммент добавить не удалось..'
                                content={error} />
							<Button content='Добавить коммент' labelPosition='left' icon='edit' primary floated='right' 
                                onClick={this.createComment}
                                disabled={!editorHasText}
								loading={creatingComment} />
						</Form>
					</Comments>
				</Fragment> }
			</ECard>
            </ErrorBoundary>
		)
	}
}

export default compose(
    graphql(createEnquiryEvent, { 
		name: 'createEnquiryEvent',
		options: (props) => ({
			update: (cache, {data: createEnquiryEvent}) => {
				const id = `Enquiry:${props.id}`
				const fragment = enquiryFragment
				const data = cache.readFragment({
					id,
					fragment
				})
				data.events.push(createEnquiryEvent.createEnquiryEvent)
				cache.writeFragment({
                    id,
                    fragment,
					data
				})
            }
		})
	}),
    graphql(newEnquiry, { name: 'enquiryQuery', skip: (props) => props.id !== 'new' }),
    graphql(enquiry, { name: 'enquiryQuery', skip: (props) => props.id === 'new' })
)(EnquiryDetails)