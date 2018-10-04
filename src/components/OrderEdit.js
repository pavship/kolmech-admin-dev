import React, { Component, Fragment } from 'react'

import { Form, Button, Message } from 'semantic-ui-react'
import { Div, Span, A, Label, Section } from './styled-semantic/styled-semantic.js'

import { graphql, compose } from 'react-apollo'
import { orderLocal } from '../graphql/order'
import { allEnquiries, createEnquiry, updateEnquiry } from '../graphql/enquiry'
// 
import { upsertOrder } from '../graphql/order'
import { createOrg } from '../graphql/org'
import { allOrgsAndModels } from '../graphql/combinedQueries'

import LocalDatePicker from './common/LocalDatePicker'
import CurrencyInput from './common/CurrencyInput'
import SmartForm from './common/SmartForm'
import SmartInput from './common/SmartInput'

import { toLocalISOString } from '../utils/dates'

class OrderEdit extends Component {
	componentIsMounted = true
	isNewEntity = this.props.id === 'new'
	state = {
		loading: false,
		err: null
	}
	submit = (entity) => {
		this.upsertOrder({
			...entity,
			...this.isNewEntity && {
				enquiryId: this.props.enquiryId,
			},
			...!this.isNewEntity && {
				id: this.props.id,
			}
		})
	}
	upsertOrder = async (variables) => {
		try {
			this.setState({ loading: true })
			const res = await this.props.upsertOrder({ variables })
			if (!this.componentIsMounted) return
			this.setState({ loading: false, err: null })
			// this.props.setDetails(null)
			this.props.setDetails({
				type: 'Order',
				id: res.data.upsertOrder.id
			})
		} catch (err) {
			if (!this.componentIsMounted) return
			this.setState({
				loading: false,
				err: {
					title: `${this.isNewEntity ? 'Создать' : 'Сохранить'} не удалось..`,
					message: err.message
				}
			})
			console.log(err)
		}
	}
	componentWillUnmount() {
		this.componentIsMounted = false
	}
	render() {
		const { loading } = this.state
		const { id, closeDetails, setDetails } = this.props
		const isNewEntity = id === 'new'
		console.log(this.props.orderLocal)
		const order = isNewEntity
			? {
				dateLocal: toLocalISOString(new Date()).slice(0, 10),
				qty: '',
				amount: ''
			}
			: this.props.orderLocal.orderLocal
		return (
			<SmartForm
				isNewEntity={isNewEntity}
				entity={order}
				requiredFields={['dateLocal', 'qty', 'amount']}
				submit={this.submit}
				err={this.state.err}
			>
				{({
					disabled,
					err,
					setField,
					submit,
					formState: { dateLocal, qty, amount }
				}) => <Fragment>
					<Section
						bottomBorder
					>
						<Form>
							<Form.Field inline>
								<Label>Дата</Label>
								<LocalDatePicker
									field={dateLocal}
									setField={setField}
								/>
							</Form.Field>
							<Form.Field inline required>
								<Label>Кол-во</Label>
								<SmartInput
									type='number'
									placeholder='Введите кол-во шт.'
									field={qty}
									setField={setField}
								/>
								<Span pl='6px'>шт.</Span>
							</Form.Field>
							<Form.Field inline required>
								<Label>Сумма</Label>
								<CurrencyInput
									field={amount}
									setField={setField}
									placeholder='Введите сумму заказа'
								/>
							</Form.Field>
						</Form>
					</Section>
					<Section>
						{err &&
							<Message
								error
								header={err.title}
								content={err.message}
							/>
						}
						<Div inline w='formLabel' />
						<Button
							primary
							content={this.isNewEntity ? 'Создать' : 'Сохранить'}
							disabled={disabled}
							loading={loading}
							onClick={submit}
						/>
						<A cancel
							onClick={
								id === 'new'
									? closeDetails
									: () => setDetails({
										type: 'Order',
										id
									})
							}
						>
							Отмена
						</A>
					</Section>
				</Fragment>}
			</SmartForm>
		)
	}
}

export default compose(
	graphql(createOrg, {
		name: 'createOrg',
		options: {
			update: (cache, { data: { createOrg } }) => {
				const query = allOrgsAndModels
				const data = cache.readQuery({ query })
				data.orgs.push(createOrg)
				data.orgs.sort((a, b) => a.name > b.name)
				cache.writeQuery({ query, data })
			}
		}
	}),
	graphql(allOrgsAndModels, { name: 'allOrgsAndModels' }),
	graphql(upsertOrder, { name: 'upsertOrder' }),
	graphql(orderLocal, { name: 'orderLocal' }),
	graphql(updateEnquiry, { name: 'updateEnquiry' }),
	graphql(createEnquiry, {
		name: 'createEnquiry',
		options: {
			update: (cache, { data: { createEnquiry } }) => {
				const query = allEnquiries
				const data = cache.readQuery({ query })
				createEnquiry.curStatusEvents = [createEnquiry.events[0]]
				createEnquiry.lastCoEvents = []
				data.enquiries.unshift(createEnquiry)
				cache.writeQuery({ query, data })
			}
		}
	}),
)(OrderEdit)