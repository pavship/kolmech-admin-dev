import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Header, Icon, Form, Input, Comment, Button, Dropdown, Message } from 'semantic-ui-react'
import DatePicker from './common/DatePicker'

import { graphql, compose } from 'react-apollo'
import { alteredEnquiry, updateEnquiry, createEnquiry } from '../graphql/enquiry'

import validateInn from '../utils/validateInn'
import { toLocalISOString, fromLocalISOString }from '../utils/dates'

const ECardBody = styled(Card.Content)`
    padding-left: 55px !important;
`

const ELabel = styled.label`
    width: 100px !important;
`

const LabelImitator = styled.div`
    display: inline-block;
    width: calc(100px + 0.857143em);
`

const EDropdown = styled(Dropdown)`
    width: 350px !important;
`

const CancelLink = styled.a`
    padding-left: 15px;
    color: rgba(0,0,0,.87);
    &:hover {
        color: #B03060;
    }
`

class EnquiryEdit extends Component {
    constructor(props){
        super(props)
        const { dateLocal } = props.enquiry
        const dateLocal = toLocalISOString(new Date()).slice(0, 10)
        this.state = { dateLocal, orgId: null }
    }
    handleDatePick = (pickedDate) => this.setState({ dateLocal: toLocalISOString(pickedDate).slice(0, 10) })
    handleOrgDropdownChange = (e, { value }) => {
        console.log('op, change', value)
        this.setState({ orgId: value })
    }
    addOrg = (e, { value }) => {
        console.log('op, add', value)
        console.log(this.state.orgId)
        let error = {}
        const result = validateInn(value, error)
        console.log(result, error)
    }
    submit = () => {
        const { dateLocal } = this.state
        // validate
        this.props.createEnquiry({
            variables: {
                dateLocal
            }
        })
    }
	render() {
        // console.log(this.props)		
        const { dateLocal, orgId } = this.state
		const { id, enquiry, updateEnquiry, closeDetails } = this.props
        const isNewEnquiry = id === 'new'
        const selectedDate = fromLocalISOString(dateLocal)
		return (
			<Fragment>
				<ECardBody>
                    {/* {dateLocal + ' ' + orgId} */}
					<Form>
						<Form.Field inline>
							<ELabel>Дата</ELabel>
                            <DatePicker
                                selectedDate={selectedDate}
                                handleDatePick={this.handleDatePick} />
                                {/* // handleDatePick={pickedDate => updateEnquiry({
                                //     variables: {
                                //         key: 'date',
                                //         value: new Date(pickedDate.setHours(0, 0, 0, 0))
                                //     }
                                // })} /> */}
						</Form.Field>
						<Form.Field inline>
							<ELabel>Организация</ELabel>
                            <EDropdown
                                options={[]}
                                placeholder='Поиск по наименованию или ИНН'
                                search
                                selection
                                // fluid
                                noResultsMessage='Не найдено. Введите ИНН, чтобы добавить.'
                                allowAdditions
                                additionLabel='Добавить по ИНН: '
                                // additionLabel={<i style={{ color: 'red' }}>Custom Language: </i>}
                                value={orgId}
                                onAddItem={this.addOrg}
                                onChange={this.handleOrgDropdownChange}
                            />
						</Form.Field>
                        <Message
                            error
                            header='Action Forbidden'
                            content='You can only sign up for an account once with a given e-mail address.'
                        />
						<Form.Field inline>
							<ELabel>First name</ELabel>
							<Input placeholder='First name' />
						</Form.Field>
						<Form.Field inline>
							<ELabel>First name</ELabel>
							<Input placeholder='First name' />
						</Form.Field>
						<Form.Field inline>
							<ELabel>First name</ELabel>
							<Input placeholder='First name' />
						</Form.Field>
					</Form>
				</ECardBody>
                <ECardBody>
                    <LabelImitator />
                    <Button content='Создать' primary onClick={this.submit} />
                    <CancelLink onClick={closeDetails}>Отмена</CancelLink>
                </ECardBody>
			</Fragment>
		)
	}
}

export default compose(
    graphql(createEnquiry, { name: 'createEnquiry' }),
    graphql(updateEnquiry, { name: 'updateEnquiry' }),
    graphql(alteredEnquiry, { name: 'alteredEnquiry' }),
)(EnquiryEdit)