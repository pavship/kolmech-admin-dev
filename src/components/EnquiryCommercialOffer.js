import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Header, Form, Message, Button } from 'semantic-ui-react'
import { Div, SLabel, SCardSection } from './styled-semantic/styled-semantic'
import LocalDatePicker from './common/LocalDatePicker'
import CurrencyInput from './common/CurrencyInput'

import { toLocalISOString }from '../utils/dates'

class EnquiryCommercialOffer extends Component {
    constructor(props){
        super(props)
        this.componentIsMounted = true
        this.isNewCO = props.id === 'new'
        const isNewCO = this.isNewCO
        this.state = {
            loading: false,
        }
        // gather original form fields' values on oriCO object
        const oriCO = isNewCO 
            ? {
                dateLocal: toLocalISOString(new Date()).slice(0, 10),
                amount: ''
              } 
            : {
                dateLocal: props.co.dateLocal,
                amount: props.co.amount
              }
        this.fields = Object.keys(oriCO)
    console.log('this.fields > ', this.fields)
        this.requiredFields = ['dateLocal', 'amount']
        // map through form fields and write helper props
        this.fields.forEach(key => {
            this.state[key] = {
                curVal: oriCO[key],
                // err bool controls weather the field is heighlighted with error (red) style
                err: { message: '' },
                // key: 1,
                ...this.requiredFields.includes(key) && { required: true },
                ...!isNewCO && {
                    oriVal: oriCO[key],
                    diff: false,
                }
            }
        })
        // this.state.dateLocal.key = 1
        // console.log(this.state)
    }
    setFieldValue = (field, newVal) => {
        console.log('change ', field, ' to value > ', newVal)
        this.setState({
            [field]: {
                ...this.state[field],
                curVal: newVal,
                ...this.isNewCO && { diff: newVal !== this.state[field].oriVal },
                err: { message: '' },
                // key: this.state[field].key + 1
            }
        })
    }
    setFieldError = (field, err) => {
        this.setState({ [field]: { ...this.state[field], err } })
    }
    handleAmountInputChange = (e, { value }) => {
        console.log(value)
        
    }
    handleAmountValueChange = ({formattedValue, value, floatValue}) => {
        console.log('formattedVal, value > ', formattedValue, value, floatValue)
    }
    render() {
        const { dateLocal, amount, loading } = this.state
        const requiredIsEmpty = this.requiredFields.some(f => !this.state[f].curVal)
        const diff = this.isNewCO ? null : this.fields.map(f => this.state[f].diff).includes(true)
        const err = this.fields.map(f => this.state[f].err).find(err => err.message) || {}
        return (
            <Fragment>
            <SCardSection head secondary >
                <Header>
                    Коммерческое предложение
                </Header>
            </SCardSection>
            <SCardSection secondary >
                <Form>
                    <Form.Field inline>
                        <SLabel>Дата</SLabel>
                        <LocalDatePicker
                            // key={dateLocal.key}
                            value={dateLocal.curVal}
                            setFormFieldValue={this.setFieldValue}
                            setFormFieldError={this.setFieldError}
                            err={dateLocal.err} />
                    </Form.Field>
                    <Form.Field inline required>
                        <SLabel>Сумма</SLabel>
                        <CurrencyInput
                            value={amount.curVal}
                            placeholder='Введите сумму КП' 
                            setFormFieldValue={this.setFieldValue} />
                    </Form.Field>
                </Form>
            </SCardSection>
            <SCardSection secondary minor>
                <Message
                    error
                    hidden={!err.message}
                    header={err.title}
                    content={err.message} />
                <Div inline w='form-label' />
                <Button 
                    primary 
                    content={'Сохранить КП'}
                    disabled={(!this.isNewCO && !diff) || !!err.message || loading || requiredIsEmpty}
                    loading={loading}
                    onClick={this.submit} />
                {/* <CancelLink onClick={cancelEdit}>Отмена</CancelLink> */}
            </SCardSection>
            </Fragment>
        )
    }
}

export default EnquiryCommercialOffer