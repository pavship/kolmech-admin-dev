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
    &:hover: {
        border-color: rgba(34, 36, 38, 0.1) !important;
    }
`

const CMessage = styled(Message)`
    // margin-left: 6.35em !important;
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
            requestIsInProcess: false,
            err: {
                title: '',
                message: ''
            },
            org: {
                text: false,
                value: 'new',
                search: '',
                error: false
            }
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
    }
    handleDatePick = (pickedDate) => {
        if (!isValidDate(pickedDate)) return
        const dateLocal = cloneDeep(this.state.dateLocal)
        dateLocal.curVal = toLocalISOString(pickedDate).slice(0, 10)
        dateLocal.diff = dateLocal.curVal !== dateLocal.oriVal
        const diff = this.fields.filter(f => f !== 'dateLocal').map(f => this.state[f].diff).includes(true) || dateLocal.diff
        this.setState({ dateLocal, diff })
    }
    handleOrgDropdownSearchChange = (e, data) => {
        this.setState({ 
            org: {
            ...this.state.org,
            search: data.searchQuery,
            error: false,
            },
            err: {
                message: ''
            }
        })
    }
    handleOrgDropdownChange = (e, data) => {
        console.log('op, change', data)
        this.setState({ org: {
            text: false,
            value: data.value,
            search: ''
        } })
    }
    handleOrgDropdownAdd = (e, { value }) => {
        try {
            console.log('op, add', value)
            console.log(this.state.orgId)
            let error = {}
            const result = validateInn(value, error)
            console.log(result, error)
            if (error.message) throw new Error(error.message)
        } catch (err) {
            this.setState({
                err: {
                    title: 'Добавить организацию по ИНН не удалось..',
                    message: err.message
                },
                org: {
                    text: value,
                    value: 'new',
                    search: value,
                    error: true
                }
             })
            console.log(err)
        }
    }
    handleOrgDropdownClose = () => {
        console.log('close ')
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
        try {
            this.setState({ requestIsInProcess: true })
            const res = await this.props.createEnquiry({ variables })
            this.setState({ requestIsInProcess: false, error: '' })
            this.props.selectEnquiry(res.data.createEnquiry.id)
        } catch (err) {
            this.setState({
                requestIsInProcess: false,
                err: {
                    title: 'Создать не удалось..',
                    message: err.message
                }
            })
            console.log(err)
        }
    }
    updateEnquiry = async (variables) => {
        try {
            this.setState({ requestIsInProcess: true })
            await this.props.updateEnquiry({ variables: { input: variables } })
            this.setState({ requestIsInProcess: false, error: '' })
            this.props.exitEditMode()
        } catch (err) {
            this.setState({ 
                requestIsInProcess: false,
                err: {
                    title: 'Сохранить не удалось..',
                    message: err.message
                }
            })
            console.log(err)
        }
    }
	render() {
        // console.log(this.props)		
        const { dateLocal, org, diff, requestIsInProcess, err } = this.state
		const { updateEnquiry, cancelEdit } = this.props
        const selectedDate = fromLocalISOString(dateLocal.curVal)
        const dropdownOptions = [
            ...(org.text && [{ text: org.text, value: 'new' }]),
            { text: 'Arabictext', value: 'Arabicvalue' }, 
            { text: 'Бabictext', value: 'Бabicvalue' }
        ]
		return (
			<Fragment>
                {JSON.stringify(org, null, 2) }
				<ECardBody>
					<Form>
						<Form.Field inline>
							<ELabel>Дата</ELabel>
                            <DatePicker
                                selectedDate={selectedDate}
                                handleDatePick={this.handleDatePick} />
						</Form.Field>
						<Form.Field inline error={org.error}>
							<ELabel>Организация</ELabel>
                            <EDropdown
                                selection //render as a formControl
                                placeholder='Поиск по наименованию или ИНН'
                                // options={ dropdownOptions }
                                options={[ { key: 'Arabickey', text: 'Arabictext', value: 'Arabicvalue' }, { key: 'Бabickey', text: 'Бabictext', value: 'Бabicvalue' }  ]}
                                value={org.value}
                                // searchQuery={org.text}
                                onChange={this.handleOrgDropdownChange}
                                selectOnBlur={false}
                                selectOnNavigation={false}
                                search
                                searchQuery={org.search}
                                onSearchChange={this.handleOrgDropdownSearchChange}
                                // fluid
                                noResultsMessage='Не найдено. Введите ИНН, чтобы добавить.'
                                allowAdditions
                                additionLabel='Добавить по ИНН: '
                                // additionLabel={<i style={{ color: 'red' }}>Custom Language: </i>}
                                onAddItem={this.handleOrgDropdownAdd}
                                onClose={this.handleOrgDropdownClose}
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
                    <CMessage
                        error
                        hidden={!err.message}
                        header={err.title}
                        content={err.message} />
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
    graphql(updateEnquiry, { 
        name: 'updateEnquiry',
        // options: {
        //     update: (cache, {data: { createEnquiry }}) => {
        //         const query = allEnquiries
        //         const data = cache.readQuery({ query })
        //         data.enquiries.unshift(createEnquiry)
        //         cache.writeQuery({ query, data })
        //     }
        // }
     }),
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