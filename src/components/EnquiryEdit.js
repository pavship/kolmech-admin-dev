import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Form, Input, Button, Dropdown, Message } from 'semantic-ui-react'
import DatePicker from './common/DatePicker'

import { graphql, compose } from 'react-apollo'
import { allEnquiries, createEnquiry, updateEnquiry } from '../graphql/enquiry'
import { org, allOrgs, createOrg } from '../graphql/org'

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
            loading: false,
            err: {
                message: ''
            },
            orgDdn: {
                search: '',
                loading: false
            }
        }
        // gather form fields on oriEnquiry object
        const oriEnquiry = cloneDeep(props.enquiry)
        console.log(oriEnquiry)
        if (isNewEnquiry) oriEnquiry.dateLocal = toLocalISOString(new Date()).slice(0, 10)
        delete oriEnquiry.comments
        oriEnquiry.orgId = oriEnquiry.org ? oriEnquiry.org.id : null //'cjlgzauej003z0919v114wb2u'
        this.fields = Object.keys(oriEnquiry)
            .filter(key => !['__typename', 'id', 'num', 'generated', 'type', 'org'].includes(key))
        // map through form fields and write helper props
        this.fields.forEach(key => {
            // console.log(key, oriEnquiry[key])
            this.state[key] = {
                curVal: oriEnquiry[key],
                err: false,
                ...!isNewEnquiry && {
                    oriVal: oriEnquiry[key],
                    diff: false,
                }
            }
        })
        if (!isNewEnquiry) this.state.diff = false
        console.log(this.state)
    }
    changeFieldValue = (field, newVal) => {
        console.log('change ', field, ' to value > ', newVal)
        const fieldObj = cloneDeep(this.state[field])
        fieldObj.curVal = newVal
        fieldObj.diff = fieldObj.curVal !== fieldObj.oriVal
        fieldObj.err = false
        const diff = this.fields.filter(f => f !== field).map(f => this.state[f].diff).includes(true) || fieldObj.diff
        this.setState({ [field]: fieldObj, diff, err: { message: '' } })
    }
    handleDatePick = (pickedDate) => {
        if (!isValidDate(pickedDate)) return this.setState({ 
            dateLocal: { ...this.state.dateLocal, err: true },
            err: { title: 'Ошибка ввода даты', message: 'Дата заявки не соответствует формату дат' } 
        })
        this.changeFieldValue('dateLocal', toLocalISOString(pickedDate).slice(0, 10))
        // const dateLocal = cloneDeep(this.state.dateLocal)
        // dateLocal.curVal = toLocalISOString(pickedDate).slice(0, 10)
        // dateLocal.diff = dateLocal.curVal !== dateLocal.oriVal
        // const diff = this.fields.filter(f => f !== 'dateLocal').map(f => this.state[f].diff).includes(true) || dateLocal.diff
        // this.setState({ dateLocal, diff })
    }
    handleOrgDropdownSearchChange = (e, { searchQuery }) => {
        // console.log('searchChange ')
        this.setState({ 
            orgDdn: { search: searchQuery, err: false },
            err: { message: '' }
        })
    }
    handleOrgDropdownChange = (e, data) => {
        // console.log('change')
        const orgId = cloneDeep(this.state.orgId)
        orgId.curVal = data.value
        orgId.diff = orgId.curVal !== orgId.oriVal
        orgId.err = false
        const diff = this.fields.filter(f => f !== 'orgId').map(f => this.state[f].diff).includes(true) || orgId.diff
        this.setState({ orgDdn: { search: '', loading: false }, orgId, diff })
    }
    selectOrg = (id) => {
        console.log('select ')
        const org = cloneDeep(this.state.org)
        const orgId = cloneDeep(this.state.orgId)
        orgId.curVal = id
        orgId.diff = orgId.curVal !== orgId.oriVal
        const diff = this.fields.filter(f => f !== 'orgId').map(f => this.state[f].diff).includes(true) || orgId.diff
        org.search = ''
        this.setState({ orgId, org, diff })
    }
    createOrg = async (e, { value: inn }) => {
        try {
            // console.log('add ')
            // console.log(this.state.orgId)
            let err = {}
            const isValidInn = validateInn(inn, err)
            if (!isValidInn) throw new Error(err.message)
            // let org = cloneDeep(this.state.org)
            // org.loading = true
            this.setState({ orgDdn: { search: inn, loading: true} })
            const data = await this.props.createOrg({ variables: { inn } })
            // console.log(data)
            const orgId = cloneDeep(this.state.orgId)
            orgId.curVal = data.data.createOrg.id
            orgId.diff = orgId.curVal !== orgId.oriVal
            orgId.err = false
            const diff = this.fields.filter(f => f !== 'orgId').map(f => this.state[f].diff).includes(true) || orgId.diff
            this.setState({ orgDdn: { search: '', loading: false }, orgId, diff, err: { message: '' } })
            // this.selectOrg(orgId.curVal)
        } catch (err) {
            this.setState({
                err: {
                    title: 'Добавить организацию по ИНН не удалось..',
                    message: err.message
                },
                orgDdn: {
                    search: inn,
                    loading: false
                },
                orgId: {
                    ...this.state.orgId,
                    err: true
                }
             })
            console.log(err)
        }
    }
    // handleOrgDropdownClose = (e, data) => {
    //     console.log('close ')
    //     console.log(data)
    // }
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
            this.setState({ loading: true })
            const res = await this.props.createEnquiry({ variables })
            this.setState({ loading: false, err: '' })
            this.props.selectEnquiry(res.data.createEnquiry.id)
        } catch (err) {
            this.setState({
                loading: false,
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
            this.setState({ loading: true })
            await this.props.updateEnquiry({ variables: { input: variables } })
            this.setState({ loading: false, err: '' })
            this.props.exitEditMode()
        } catch (err) {
            this.setState({ 
                loading: false,
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
        const { dateLocal, orgId, orgDdn, diff, loading, err } = this.state
		const { cancelEdit, allOrgs } = this.props
        const selectedDate = fromLocalISOString(dateLocal.curVal)
        const orgs = allOrgs.orgs
        // const dropdownOptions = orgs ? orgs.map(o => ({key:o.id, value: o.id, text: o.name})) : []
        // console.log(dropdownOptions)
        // console.log('orgId > ', orgId)
		return (
			<Fragment>
				<ECardBody>
					<Form>
						<Form.Field inline>
							<ELabel>Дата</ELabel>
                            <DatePicker
                                error={dateLocal.err}
                                selectedDate={selectedDate}
                                handleDatePick={this.handleDatePick} />
						</Form.Field>
						<Form.Field inline error={orgId.err}>
							<ELabel>Организация</ELabel>
                            <EDropdown
                                loading={!orgs || orgDdn.loading}
                                disabled={!orgs || orgDdn.loading}
                                selection //render as a formControl
                                placeholder='Поиск по наименованию или ИНН'
                                options={ orgs ? orgs.map(o => ({key:o.id, value: o.id, text: o.name})) : [] }
                                value={orgId.curVal}
                                onChange={this.handleOrgDropdownChange}
                                selectOnBlur={false}
                                selectOnNavigation={false}
                                search
                                searchQuery={orgDdn.search}
                                onSearchChange={this.handleOrgDropdownSearchChange}
                                noResultsMessage='Не найдено. Введите ИНН, чтобы добавить.'
                                allowAdditions
                                additionLabel='Добавить по ИНН: '
                                onAddItem={this.createOrg}
                                // onClose={this.handleOrgDropdownClose}
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
                        loading={loading}
                        onClick={this.submit} />
                    <CancelLink onClick={cancelEdit}>Отмена</CancelLink>
                </ECardBody>
			</Fragment>
		)
	}
}

export default compose(
    graphql(createOrg, { 
        name: 'createOrg',
        options: {
            update: (cache, {data: { createOrg }}) => {
                const query = allOrgs
                const data = cache.readQuery({ query })
                data.orgs.push(createOrg)
                data.orgs.sort((a, b) => a.name > b.name)
                cache.writeQuery({ query, data })
            }
        }
    }),
    // graphql(org, { name: 'orgQuery' }),
    graphql(allOrgs, { name: 'allOrgs' }),
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