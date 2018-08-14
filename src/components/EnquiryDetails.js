import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'

import styled from 'styled-components'
import { Card, Header, Icon, Form, Input, Comment, Button } from 'semantic-ui-react'
import DatePicker from './DatePicker'

import updateEnquiry from '../graphql/updateEnquiry'

const ECard = styled(Card)`
    border-radius: 0 !important;
    box-shadow: none !important;
`

const ECardTop = styled(Card.Content)`
    display: flex !important;
    align-items: center !important;
`

const EHeader = styled(Header)`
    margin: 0 !important;
`

const EIcon = styled(Icon)`
    cursor: pointer;
`

const ECardBody = styled(Card.Content)`
    padding-left: 55px !important;
`

const Comments = styled(Comment.Group)`
    margin: 1.5em 1.5em 1.5em 45px !important;
`

const EnquiryDetails = ({ closeDetails }) => {
    return (
        <Mutation mutation={updateEnquiry}>
        {updateEnquiry => (
            <ECard fluid>
                <ECardTop>
                    <EHeader>
                        <EIcon name='cancel' onClick={closeDetails} />
                        <Header.Content>Заявка №10</Header.Content>
                    </EHeader>
                        <DatePicker
                            selectedDate={new Date()} 
                            handleDatePick={pickedDate => updateEnquiry({
                                variables: {
                                    key: 'date',
                                    value: new Date(pickedDate.setHours(0,0,0,0))
                                }
                            })} />
                </ECardTop>
                <ECardBody>
                    <Form>
                        <Form.Field inline>
                            <label>First name</label>
                            <Input placeholder='First name' />
                        </Form.Field>
                        <Form.Field inline>
                            <label>First name</label>
                            <Input placeholder='First name' />
                        </Form.Field>
                        <Form.Field inline>
                            <label>First name</label>
                            <Input placeholder='First name' />
                        </Form.Field>
                        <Form.Field inline>
                            <label>First name</label>
                            <Input placeholder='First name' />
                        </Form.Field>
                        <Form.Field inline>
                            <label>First name</label>
                            <Input placeholder='First name' />
                        </Form.Field>
                    </Form>
                </ECardBody>
                <Comments minimal>
                    <Header as='h3' dividing>
                        Комментарии
                    </Header>

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
                </Comments>
            </ECard>
        )}
        </Mutation>
    )
}

export default EnquiryDetails