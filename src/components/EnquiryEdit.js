import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Form, Input, Button, Dropdown, Message } from 'semantic-ui-react'
import DatePicker from './common/DatePicker'

import { graphql, compose } from 'react-apollo'
import { allEnquiries, createEnquiry, updateEnquiry } from '../graphql/enquiry'

import cloneDeep from 'lodash/cloneDeep'
import validateInn from '../utils/validateInn'
import { isValidDate, toLocalISOString, fromLocalISOString }from '../utils/dates'

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
        this.isNewEnquiry = props.id === 'new'
        const isNewEnquiry = this.isNewEnquiry
        this.state = {
            requestIsInProcess: false
        }
        const oriEnquiry = cloneDeep(props.enquiry)
        if (isNewEnquiry) oriEnquiry.dateLocal = toLocalISOString(new Date()).slice(0, 10)
        this.fields = Object.keys(oriEnquiry)
                            .filter(key => !['__typename', 'id', 'num'].includes(key))
        this.fields.forEach(key => {
            // console.log(key, oriEnquiry[key])
            this.state[key] = {
                curVal: oriEnquiry[key],
                error: false,
                ...!isNewEnquiry && {
                    oriVal: oriEnquiry[key],
                    diff: false,
                }
            }
        })
        if (!isNewEnquiry) this.state.diff = false
        console.log(this.state)
    }
    handleDatePick = (pickedDate) => {
        if (!isValidDate(pickedDate)) return
        const dateLocal = cloneDeep(this.state.dateLocal)
        dateLocal.curVal = toLocalISOString(pickedDate).slice(0, 10)
        dateLocal.diff = dateLocal.curVal !== dateLocal.oriVal
        const diff = this.fields.filter(f => f !== 'dateLocal').map(f => this.state[f].diff).includes(true) || dateLocal.diff
        this.setState({ dateLocal, diff })
    }
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
        const enquiry = {}
        this.fields.forEach(f => {
            if (this.isNewEnquiry || this.state[f].diff) enquiry[f] = this.state[f].curVal
        })
        const variables = { ...enquiry }
        // TODO validate
        if (this.isNewEnquiry) return this.createEnquiry(variables)
        variables.id = this.props.id
        this.updateEnquiry(variables)
    }
    createEnquiry = async (variables) => {
        this.setState({ requestIsInProcess: true })
        const res = await this.props.createEnquiry({ variables })
        this.setState({ requestIsInProcess: false })
        // console.log(data)
        this.props.setActiveEnquiry(res.data.createEnquiry.id)
    }
    updateEnquiry = async (variables) => {
        this.setState({ requestIsInProcess: true })
        await this.props.updateEnquiry({ variables })
        this.setState({ requestIsInProcess: false })
        this.props.exitEditMode()
    }
	render() {
        // console.log(this.props)		
        const { dateLocal, diff, requestIsInProcess } = this.state
		const { updateEnquiry, cancelEdit } = this.props
        const selectedDate = fromLocalISOString(dateLocal.curVal)
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
                                value={null}
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
                    <Button 
                        primary 
                        content={this.isNewEnquiry ? 'Создать' : 'Сохранить'}
                        disabled={!this.isNewEnquiry && !diff}
                        loading={requestIsInProcess}
                        onClick={this.submit} />
                    <CancelLink onClick={cancelEdit}>Отмена</CancelLink>
                </ECardBody>
			</Fragment>
		)
	}
}

export default compose(
    graphql(updateEnquiry, { name: 'updateEnquiry' }),
    graphql(createEnquiry, { 
        name: 'createEnquiry',
        options: {
            update: (cache, {data: { createEnquiry }}) => {
                const query = allEnquiries
                const data = cache.readQuery({ query })
                data.enquiries.unshift(createEnquiry)
                cache.writeQuery({ query, data })
            }
        }
    }),
)(EnquiryEdit)