import React, { Component, Fragment } from 'react'

import { Form, Button, Message } from 'semantic-ui-react'
import { Div, Span, A, Label, CardSection } from './styled-semantic/styled-semantic.js'

import { graphql, compose } from 'react-apollo'
import { allEnquiries, createEnquiry, updateEnquiry } from '../graphql/enquiry'
import { createOrg } from '../graphql/org'
import { allOrgsAndModels } from '../graphql/combinedQueries'

import LocalDatePicker from './common/LocalDatePicker'
import CurrencyInput from './common/CurrencyInput'
import SmartForm from './common/SmartForm'
import SmartInput from './common/SmartInput'

import { toLocalISOString }from '../utils/dates'

class OrderEdit extends Component {
    isNewEntity = this.props.id === 'new'
    submit = (entity) => {
        if (this.isNewEntity) return this.createEnquiry(entity)
        this.updateEnquiry({...entity, id: this.props.id})
    }
    createEnquiry = async (variables) => {
        try {
            this.setState({ loading: true })
            const res = await this.props.createEnquiry({ variables })
            if (!this.componentIsMounted) return
            this.setState({ loading: false, err: '' })
            // this.props.selectEnquiry(res.data.createEnquiry.id)
            // this.props.selectEntity(res.data.createOrder.id)
        } catch (err) {
            if (!this.componentIsMounted) return
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
            if (!this.componentIsMounted) return
            this.setState({ loading: false, err: '' })
            this.props.closeDetails()
        } catch (err) {
            if (!this.componentIsMounted) return
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
    componentWillUnmount() {
        this.componentIsMounted = false
    }
	render() {
        // const orgs = allOrgsAndModels.orgs
        // const models = allOrgsAndModels.models
        const { closeDetails, cancel, submit, loading } = this.props
        const isNewOrder = this.props.id === 'new'
        const order = isNewOrder
        ?   {
                dateLocal: toLocalISOString(new Date()).slice(0, 10),
                qty: '',
                amount: ''
            } 
        :   {
                dateLocal: this.props.order.dateLocal,
                qty: this.props.order.qty,
                amount: this.props.order.amount
            }
		return (
			<SmartForm
                isNewEntity={isNewOrder}
                entity={order}
                requiredFields={['dateLocal', 'qty', 'amount']}
                submit={submit}
            >
                {({
                    diff,
                    requiredIsEmpty,
                    err,
                    setFieldValue,
                    setFieldError,
                    formState: { dateLocal, qty, amount }
                }) => <Fragment>
                    <CardSection>
                        <Form>
                            <Form.Field inline>
                                <Label>Дата</Label>
                                <LocalDatePicker
                                    value={dateLocal.curVal}
                                    setFormFieldValue={setFieldValue}
                                    setFormFieldError={setFieldError}
                                    err={dateLocal.err} />
                            </Form.Field>
                            <Form.Field inline required>
                                <Label>Кол-во</Label>
                                <SmartInput type='number'
                                    placeholder='Введите кол-во шт.' 
                                    value={qty.curVal}
                                    setFormFieldValue={setFieldValue}
                                />
                                <Span pl='6px'>шт.</Span>
                            </Form.Field>
                            <Form.Field inline required>
                                <Label>Сумма</Label>
                                <CurrencyInput
                                    value={amount.curVal}
                                    placeholder='Введите сумму заказа'
                                    setFormFieldValue={setFieldValue} />
                            </Form.Field>
                        </Form>
                    </CardSection>
                    <CardSection>
                        {err &&
                            <Message
                                error
                                header={err.title}
                                content={err.message} 
                            />
                        }
                        <Div inline w='formLabelWidth' />
                        <Button 
                            primary 
                            content={this.isNewEntity ? 'Создать' : 'Сохранить'}
                            disabled={(!this.isNewEntity && !diff) || !!err || requiredIsEmpty}
                            loading={loading}
                            onClick={this.submit} />
                        <A cancel onClick={closeDetails}>Отмена</A>
                    </CardSection>
                </Fragment>}
            </SmartForm>
		)
	}
}

export default compose(
    graphql(createOrg, { 
        name: 'createOrg',
        options: {
            update: (cache, {data: { createOrg }}) => {
                const query = allOrgsAndModels
                const data = cache.readQuery({ query })
                data.orgs.push(createOrg)
                data.orgs.sort((a, b) => a.name > b.name)
                cache.writeQuery({ query, data })
            }
        }
    }),
    graphql(allOrgsAndModels, { name: 'allOrgsAndModels' }),
    graphql(updateEnquiry, { name: 'updateEnquiry' }),
    graphql(createEnquiry, { 
        name: 'createEnquiry',
        options: {
            update: (cache, {data: { createEnquiry }}) => {
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