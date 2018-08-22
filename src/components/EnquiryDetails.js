import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Header, Icon, Label, Form, Comment, Button } from 'semantic-ui-react'
import DatePicker from './common/DatePicker'

import { Query, Mutation, graphql, compose } from 'react-apollo'
import { enquiry, newEnquiry, createEnquiryComment, enquiryFragment } from '../graphql/enquiry'

import EnquiryEdit from './EnquiryEdit'
import ButtonColoredOnHover from './common/ButtonColoredOnHover'
import DraftEditor from './common/DraftEditor'
import { sanitize } from 'dompurify'

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

const CIcon = styled(Icon)`
	width: 1.4em !important;
	margin-top: .15em !important;
	float: left;
`

const CLabel = styled(Label)`
	width: 2em;
	height: 2em;
	margin-left: 0 !important;
	padding: .4em 0em !important;
	float: left;
	text-align: center;
`

const CContent = styled(Comment.Content)`
	margin-left: 6.5em !important;
`

const CMetadata = styled(Comment.Metadata)`
	color: rgba(0,0,0,.6) !important;
`

const CText = styled(Comment.Text)`
	&>p {
        margin: 0 !important;
    }
`

const StyledEditorWrapper = styled.div`
    padding: .78571429em 1em;
    margin-bottom: 1em;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
    transition: color .1s ease,border-color .1s ease;
    line-height: 1.2857;
`
    
class EnquiryDetails extends Component {
    isNewEnquiry = this.props.id === 'new'
    editorRef = React.createRef()
	state = {
		editMode: this.isNewEnquiry ? true : false,
        creatingComment: false,
        htmlText: '', //formatted text from draft js Editor
        editorHasText: false,
		commentText: '',
        rawComment: {},
        rawText: '{ "blocks": [ { "key": "3ojq8", "text": "qewrwe", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "ctpk9", "text": " dsfgsdgfd", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} } ], "entityMap": {} }'
	}
    enableEditMode = () => this.setState({ editMode: true })
    exitEditMode = () => this.setState({ editMode: false })
    setEditorHasText = (bool) => this.setState({ editorHasText: bool })
    cancelEdit = () => {
        if (this.isNewEnquiry) return this.props.closeDetails()
        this.exitEditMode()
	}
	handleTextareaChange = (e, target) => {
		this.setState({commentText: target.value})
	}
	createComment = async () => {
        // console.log(this.state.commentText)
        const htmlText = this.editorRef.current.exportHtml()
        if (htmlText === '<p><br></p>') return
        // this.setState({ htmlText })


		this.setState({creatingComment: true})
		await this.props.createEnquiryComment({
			variables: {
				enquiryId: this.props.id,
				htmlText
			}
		})
        this.setState({ creatingComment: false, editorHasText: false })
        this.editorRef.current.clear()
    }
    printOutRaw = (rawComment) => {
        this.setState({rawComment})
    }
	render() {
		// console.log(this.props)
		const { editMode, commentText, creatingComment, rawComment, rawText, htmlText, editorHasText } = this.state
		const { id, closeDetails, enquiryQuery, setActiveEnquiry } = this.props
		const isNewEnquiry = this.isNewEnquiry
		if (enquiryQuery.loading) return "Загрузка..."
        if (enquiryQuery.error) return `Ошибка ${enquiryQuery.error.message}`
        const enquiry = isNewEnquiry ? enquiryQuery.newEnquiry : enquiryQuery.enquiry
		const { num, dateLocal, comments } = enquiry
		return (
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
                    { !isNewEnquiry &&
					    <EditButton icon='edit' coloronhover='blue' active={editMode} onClick={this.enableEditMode} /> }
				</ECardTop>
				{ (editMode || isNewEnquiry) &&
                    <EnquiryEdit id={id} 
                        enquiry={enquiry} 
                        cancelEdit={this.cancelEdit} 
                        exitEditMode={this.exitEditMode} 
                        setActiveEnquiry={setActiveEnquiry} /> }
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
								<Td>Жопа покруче</Td>
							</Tr>
						</tbody></Table>
					</ECardBody>
                    
					<Comments minimal>
						<Header as='h3' dividing content='Комментарии и события' />
                        { comments.map(c => (
                            <Comment key={c.id}>
								{ c.type &&
									<CIcon size='big'
										name={c.type === 'CREATE' ? 'arrow alternate circle up outline' : 'question'}  
									/> }
								<CLabel size='big' content='КП' />
                                {/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
                                <CContent>
                                    <Comment.Author as='span'>Константин Поляков</Comment.Author>
                                    <CMetadata>
                                        <span>{c.datetimeLocal.slice(0,16)}</span>
                                    </CMetadata>
                                    {/* <Comment.Text>{c.text}</Comment.Text> */}
                                    {/* <Comment.Text><DraftEditor readOnly={true} rawText={rawText}/></Comment.Text> */}
                                    <CText dangerouslySetInnerHTML={{__html: sanitize(c.htmlText)}} />
                                    {/* <Comment.Text dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(thisIsMyCopy)}}> */}
                                    {/* <Comment.Actions>
                                        <a>Reply</a>
                                    </Comment.Actions> */}
                                </CContent>
                            </Comment>
                        ))}
						<Form reply>
							<StyledEditorWrapper>
                                <DraftEditor ref={this.editorRef} setEditorHasText={this.setEditorHasText}/>
                                {/* <DraftEditor printOutRaw={this.printOutRaw} ref={this.editorRef}/> */}
                            </StyledEditorWrapper>
							<Form.TextArea onChange={this.handleTextareaChange} />
							<Button content='Добавить коммент' labelPosition='left' icon='edit' primary floated='right' 
                                onClick={this.createComment}
                                disabled={!editorHasText}
								loading={creatingComment} />
						</Form>
					</Comments>
				</Fragment> }
			</ECard>
		)
	}
}

export default compose(
    graphql(createEnquiryComment, { 
		name: 'createEnquiryComment',
		options: (props) => ({
			update: (cache, {data: createEnquiryComment}) => {
				const id = `Enquiry:${props.id}`
				const fragment = enquiryFragment
				const data = cache.readFragment({
					id,
					fragment
				})
				data.comments.push(createEnquiryComment.createEnquiryComment)
				cache.writeData({
					id,
					data
				})
			}
		})
	}),
    graphql(newEnquiry, { name: 'enquiryQuery', skip: (props) => props.id !== 'new' }),
    graphql(enquiry, { name: 'enquiryQuery', skip: (props) => props.id === 'new' })
)(EnquiryDetails)