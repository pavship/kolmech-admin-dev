import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Header, Icon, Label, Form, Comment, Button, 
        Message, Dropdown } from 'semantic-ui-react'
import { graphql, compose } from 'react-apollo'
import { enquiryDetails, newEnquiry, createEnquiryEvent, 
        enquiryFragment, allEnquiries, updateEnquiry } from '../graphql/enquiry'
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
        width: 130px;
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
const InputTd = Td.extend`
    padding-top: 0 !important;
`

const EditorTd = InputTd.extend`
    font-weight: unset !important;
    padding-bottom: 0 !important;
`

const SDropdown = styled(Dropdown)`
    & .active.item {
        display: none !important;
    }
    & .selected.item {
        background: none !important;
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
    margin-left: 0 !important;
	color: rgba(0,0,0,.6) !important;
`

const CText = styled(Comment.Text)`
    & p { margin: 0 !important; }
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

const EditorWrapper = styled.div`
    padding: .78571429em 1em;
    margin: 0;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
    transition: color .1s ease,border-color .1s ease;
    /* line-height: 1em; */
    line-height: 1.4285em;
    ${props => props.withButton && 'margin-bottom: 1em'}
`

const CommentEditorWrapper = EditorWrapper.extend`
    margin: 0 0 1em 6.35em;
`

const CMessage = styled(Message)`
    margin-left: 6.35em !important;
`
    
class EnquiryDetails extends Component {
    isNewEnquiry = this.props.id === 'new'
    editorRef = React.createRef()
    noteEditorRef = React.createRef()
    componentIsMounted = true
	state = {
		editMode: this.isNewEnquiry ? true : false,
        editorHasText: false,
        noteEditorDiff: false,
        noteKey: 1,
        loading: false,
        creatingComment: false,
        changingStatus: false,
        savingNote: false,
        error: ''
    }
    refetchEnquiry = async () => {
        this.setState({ loading: true })
        const res = await this.props.enquiryQuery.refetch()
        this.setState({ loading: false })
    }
    enableEditMode = () => this.setState({ editMode: true })
    exitEditMode = () => this.setState({ editMode: false })
    setEditorHasText = (bool) => this.setState({ editorHasText: bool })
    setNoteEditorDiff = (bool) => this.setState({ noteEditorDiff: bool })
    cancelEdit = () => {
        if (this.isNewEnquiry) return this.props.closeDetails()
        this.exitEditMode()
	}
	createComment = async () => {
        try {
            const htmlText = this.editorRef.current.exportHtml()
            // if (htmlText === '<p><br></p>') return
            if (htmlText === null) return
            this.setState({creatingComment: true})
            await this.props.createEnquiryEvent({
                variables: {
                    enquiryId: this.props.id,
                    htmlText
                }
            })
            this.setState({ creatingComment: false, editorHasText: false, error: '' })
            this.editorRef.current.clear()
        } catch(err) {
            this.setState({ creatingComment: false, error: err.message })
            console.log(err)
        }
    }
    changeStatus = async (e, {value}) => {
        try {
            this.setState({ changingStatus: true })
            await this.props.createEnquiryEvent({
                variables: {
                    enquiryId: this.props.id,
                    statusId: value
                }
            })
            this.setState({ changingStatus: false })
        } catch (err) {
            this.setState({ changingStatus: false, error: err.message })
            console.log(err)
        }
    }
    saveNote = async () => {
        try {
            let htmlNote = this.noteEditorRef.current.exportHtml()
            console.log('htmlNote > ', htmlNote)
            if (htmlNote === this.props.enquiryQuery.enquiry.htmlNote) {
                return this.setState({ noteKey: this.state.noteKey + 1, noteEditorDiff: false })
            }
            this.setState({ savingNote: true })
            await this.props.updateEnquiry({ 
                variables: { input: { id: this.props.id, htmlNote } } })
            if (!this.componentIsMounted) return
            this.setState({ savingNote: false, error: '', noteKey: this.state.noteKey + 1, noteEditorDiff: false })
        } catch (err) {
            if (!this.componentIsMounted) return
            this.setState({ savingNote: false, error: err.message })
            console.log(err)
        }
    }
	render() { 
        // console.log(this.state, this.props);
        const { editMode, editorHasText, loading, creatingComment, changingStatus, error,
                noteEditorDiff, noteKey, savingNote } = this.state
		const { id, enquiryQuery, closeDetails, selectEnquiry } = this.props
        const isNewEnquiry = this.isNewEnquiry
		if (enquiryQuery.loading) return "Загрузка..."
        if (enquiryQuery.error) return `Ошибка ${enquiryQuery.error.message}`
        const enquiry = isNewEnquiry ? enquiryQuery.newEnquiry : enquiryQuery.enquiry
        const { num, dateLocal, org, model, qty, htmlNote, events } = enquiry
        const curStatus = events && events.filter(e => e.status).pop().status
        const refusalStatusIds = ['cjlj25g4q00170959picodhln', 'cjlj2c004001c0959k6qq42xz']
        const orderStatusId = 'cjlj2ckgy001i09599l147fot'
        // sort so that refusal statuses are at the end of their stage block
        const statuses = enquiryQuery.statuses.slice().sort((a, b) => a.stage === b.stage && refusalStatusIds.includes(a.id))
        let stage = 0
        const eventStatusPresentationHelpers = events && events.reduce((res, e, i) => {
            if (!e.status || i === 0) return res = [...res, null]
            if (refusalStatusIds.includes(e.status.id)) return [...res, 'refuse']
            if (e.status.id === orderStatusId) return [...res, 'order']
            res.push(e.status.stage - stage > 0 ? 'up' : 'down')
            stage = e.status.stage
            return res
        }, [])
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
								<Td>Изделие</Td>
								<Td>{model && model.name}</Td>
                                <Td></Td>
							</Tr>
							<Tr>
								<Td>Кол-во, шт.</Td>
								<Td>{qty}</Td>
                                <Td></Td>
							</Tr>
							<Tr>
								<Td>Статус</Td>
                                <InputTd>
                                    <SDropdown labeled button className='icon'
                                        loading={changingStatus}
                                        disabled={changingStatus}
                                        value={curStatus.id}
                                        text={curStatus.name}
                                        options={statuses
                                            .filter(s => (s.id === curStatus.id
                                                        || Math.abs(s.stage - curStatus.stage) === 1)
                                                        && !(s.stage === 0 && curStatus.stage !== 0))
                                            .map(s => ({
                                                key: s.id,
                                                text: s.name,
                                                value: s.id,
                                                label: { 
                                                    basic: true, 
                                                    content: 'ст', 
                                                    detail: s.stage, 
                                                    icon:   refusalStatusIds.includes(s.id) ? 'minus circle' :
                                                            s.id === orderStatusId ? 'checkmark' :
                                                            `long arrow alternate ${(s.stage - curStatus.stage) > 0 ? 'up' : 'down' }`
                                                }
                                            }))
                                        }
                                        onChange={this.changeStatus} 
                                        selectOnBlur={false}
                                        selectOnNavigation={false} >
                                    </SDropdown>
                                    <Label basic size='large' content='стадия' detail={ curStatus.stage} />
                                </InputTd>
                                <Td></Td>
							</Tr>
                            <Tr>
                                <Td>Примечания</Td>
                                <EditorTd>
                                    <EditorWrapper withButton={noteEditorDiff}>
                                        <DraftEditor ref={this.noteEditorRef} key={noteKey}
                                            initFromHtml={htmlNote}
                                            setEditorDiff={this.setNoteEditorDiff}
                                            onSave={this.saveNote} /> 
                                    </EditorWrapper> 
                                    { noteEditorDiff &&
                                        <Button content='Сохранить примечания' labelPosition='left' icon='save' primary floated='left' 
                                            onClick={this.saveNote}
                                            disabled={savingNote}
                                            loading={savingNote} /> }
                                </EditorTd>
                                <Td></Td>
                            </Tr>
						</tbody></Table>
					</ECardBody>
                    
					<Comments minimal>
						<Header as='h3' dividing content='Комментарии и события' />
                        { events.map((e, i) => {
							const { fName, lName } = e.user.person
                            const userInitials = (lName ? fName.slice(0,1) : fName.slice(0,2)) + (lName ? lName.slice(0,1) : '')
                            return (
								<Comment key={e.id}>
									{ e.type && (e.type !== 'COMMENT') &&
									<CIcon 
                                        size='big' type={e.type}
                                        color={ e.type === 'CREATE' ? 'green' : 
                                                e.type === 'UPDATE' ? 'blue' : 
                                                e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'up' ? 'yellow' :
                                                e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'down' ? 'brown' :
                                                e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'refuse' ? 'red' :
                                                e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'order' ? 'green' : 'grey'}
                                        name ={ e.type === 'CREATE' ? 'plus' : 
                                                e.type === 'UPDATE' ? 'write square' : 
                                                e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'refuse' ? 'minus circle' :
                                                e.type === 'STATUS' && eventStatusPresentationHelpers[i] === 'order' ? 'checkmark' :
                                                e.type === 'STATUS' ? `long arrow alternate ${eventStatusPresentationHelpers[i]}` : 'question'} /> }
									<UserLabel 
										size='big' 
										content={userInitials}
										indent={!e.type || e.type === 'COMMENT' ? 1 : 0} />
									{/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /> */}
									<CContent>
										{/* <Comment.Author 
											as='span' 
											content={fName + ' ' + lName} /> */}
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
							<CommentEditorWrapper>
                                <DraftEditor ref={this.editorRef} 
                                    setEditorHasText={this.setEditorHasText}
                                    onSave={this.createComment} />
                            </CommentEditorWrapper>
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
		)
	}
}

export default compose(
    graphql(updateEnquiry, { name: 'updateEnquiry' }),
    graphql(createEnquiryEvent, { 
		name: 'createEnquiryEvent',
		options: (props) => ({
			update: (cache, {data: reponseData}) => {
                const newEvent = reponseData.createEnquiryEvent
				const id = `Enquiry:${props.id}`
				const fragment = enquiryFragment
				let data = cache.readFragment({
					id,
					fragment
				})
				data.events.push(newEvent)
				cache.writeFragment({
                    id,
                    fragment,
					data
                })
                // also update allEnquiries if status changed (for EnquiryTable view update)
                if (! newEvent.status) return
                const query = allEnquiries
                data = cache.readQuery({ query })
                const enquiry = data.enquiries.find(e => e.id === props.id)
                enquiry.events = [newEvent]
                cache.writeQuery({ query, data })
            },
            refetchQueries:[ 'allEnquiries' ]
		})
	}),
    graphql(newEnquiry, { name: 'enquiryQuery', skip: (props) => props.id !== 'new' }),
    graphql(enquiryDetails, { name: 'enquiryQuery', skip: (props) => props.id === 'new' })
)(EnquiryDetails)