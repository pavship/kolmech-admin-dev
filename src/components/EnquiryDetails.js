import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Header, Icon, Form, Input, Comment, Button } from 'semantic-ui-react'
import DatePicker from './common/DatePicker'

import { Query, Mutation, graphql, compose } from 'react-apollo'
import { enquiry, newEnquiry, alteredEnquiry, updateEnquiry } from '../graphql/enquiry'

import EnquiryEdit from './EnquiryEdit'
import ButtonColoredOnHover from './common/ButtonColoredOnHover'

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

const EditButton = styled(ButtonColoredOnHover)`
    margin-left: auto !important;
`

const ECardBody = styled(Card.Content)`
    padding-left: 55px !important;
`

const Table = styled.table`
    table-layout: fixed;
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
		width: 100px;
		margin: 0 0 1em;
		font-weight: bold;
		// color: rgba(0,0,0,.87);
		font-size: .92857143em;
		line-height: 32px;
	}
	:nth-child(2) {
		// width: 100px;
		font-size: 1em;
		line-height: 1.21428571em;
		padding: .67857143em 1em;
	}
`

const Comments = styled(Comment.Group)`
    margin: 1.5em 1.5em 1.5em 45px !important;
`

class EnquiryDetails extends Component {
	isNewEnquiry = this.props.id === 'new'
	state = {
		editMode: this.isNewEnquiry ? true : false
	}

	enableEditMode = () => this.setState({ editMode: true })
	render() {
		console.log(this.props)
		const { editMode } = this.state
		const { id, closeDetails, enquiry, updateEnquiry } = this.props
		const isNewEnquiry = id === 'new'
		// if (isNewEnquiry) this.enableEditMode()
		if (enquiry.loading) return "Загрузка..."
		if (enquiry.error) return `Ошибка ${enquiry.error.message}`
		const { num, dateLocal, orgId } =  isNewEnquiry ? enquiry.newEnquiry : enquiry.enquiry
		return (
			<ECard fluid>
				<ECardTop>
					<EHeader>
						<EIcon name='cancel' onClick={closeDetails} />
						<Header.Content>
							{ isNewEnquiry 
								? 'Новая заявка' 
								: 	<Fragment>
										{`Заявка №${num}`}
										<SHeader>{`от ${dateLocal}`}</SHeader>
									</Fragment> 
							}
						</Header.Content>
					</EHeader>
					<EditButton icon='edit' coloronhover='blue' active={editMode} onClick={this.enableEditMode} />
				</ECardTop>
				{ (editMode || isNewEnquiry) &&
					<EnquiryEdit id={id} enquiry={enquiry.enquiry} closeDetails={closeDetails} />
				}
				{ !(editMode || isNewEnquiry) && <Fragment>
					<ECardBody>
						<Table><tbody>
							<Tr>
								<Td>Организация</Td>
								{/* <Td>{orgId}</Td> */}
								<Td>Жопа на круче</Td>
							</Tr>
							<Tr>
								<Td>Организация</Td>
								{/* <Td>{orgId}</Td> */}
								<Td>Жопа на круче</Td>
							</Tr>
						</tbody></Table>
					</ECardBody>
					{/* <Comments minimal>
						<Header as='h3' dividing content='Комментарии' />
						<Comment>
							<Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
							<Comment.Content>
								<Comment.Author as='a'>Matt</Comment.Author>
								<Comment.Metadata>
									<span>Today at 5:42PM</span>
								</Comment.Metadata>
								<Comment.Text>How artistic!</Comment.Text>
								<Comment.Actions>
									<a>Reply</a>
								</Comment.Actions>
							</Comment.Content>
						</Comment>

						<Comment>
							<Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
							<Comment.Content>
								<Comment.Author as='a'>Elliot Fu</Comment.Author>
								<Comment.Metadata>
									<span>Yesterday at 12:30AM</span>
								</Comment.Metadata>
								<Comment.Text>
									<p>This has been very useful for my research. Thanks as well!</p>
								</Comment.Text>
								<Comment.Actions>
									<a>Reply</a>
								</Comment.Actions>
							</Comment.Content>

							<Comment.Group>
								<Comment>
									<Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
									<Comment.Content>
										<Comment.Author as='a'>Jenny Hess</Comment.Author>
										<Comment.Metadata>
											<span>Just now</span>
										</Comment.Metadata>
										<Comment.Text>Elliot you are always so right :)</Comment.Text>
										<Comment.Actions>
											<a>Reply</a>
										</Comment.Actions>
									</Comment.Content>
								</Comment>
							</Comment.Group>
						</Comment>

						<Comment>
							<Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
							<Comment.Content>
								<Comment.Author as='a'>Joe Henderson</Comment.Author>
								<Comment.Metadata>
									<span>5 days ago</span>
								</Comment.Metadata>
								<Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
								<Comment.Actions>
									<a>Reply</a>
								</Comment.Actions>
							</Comment.Content>
						</Comment>

						<Form reply>
							<Form.TextArea />
							<Button content='Добавить коммент' labelPosition='left' icon='edit' primary floated='right' />
						</Form>
					</Comments> */}
				</Fragment> }
			</ECard>
		)
	}
}

export default compose(
    graphql(updateEnquiry, { name: 'updateEnquiry' }),
    graphql(alteredEnquiry, { name: 'alteredEnquiry' }),
    graphql(newEnquiry, { name: 'enquiry', skip: (props) => props.id !== 'new' }),
    graphql(enquiry, { name: 'enquiry', skip: (props) => props.id === 'new' })
)(EnquiryDetails)