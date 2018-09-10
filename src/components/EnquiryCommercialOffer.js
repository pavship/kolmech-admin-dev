import React, { Component, Fragment } from 'react'

import styled from 'styled-components'
import { Card, Segment, Header, Form, Input, Message, Button } from 'semantic-ui-react'
import { SLabel, Span, SCardSection } from './styled-semantic/styled-semantic'
// import DatePicker from './common/DatePicker'
import LocalDatePicker from './common/LocalDatePicker'

import { isValidDate, toLocalISOString, fromLocalISOString }from '../utils/dates'

// export const COFormContext = React.createContext()

class EnquiryCommercialOffer extends Component {
    constructor(props){
        super(props)
        this.componentIsMounted = true
        this.isNewCO = props.id === 'new'
        const isNewCO = this.isNewCO
        this.state = {
            loading: false,
            // if any of the form fields has error, the following err prop should always contain non empty error message string
            // err: {
            //     title: '',
            //     message: ''
            // }
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
                ...this.requiredFields.includes(key) && { required: true },
                ...!isNewCO && {
                    oriVal: oriCO[key],
                    diff: false,
                }
            }
        })
        if (!isNewCO) this.state.diff = false
        // console.log(this.state)
    }
    setFieldValue = (field, newVal) => {
        console.log('change ', field, ' to value > ', newVal)
        this.setState({
            [field]: {
                ...this.state[field],
                curVal: newVal,
                ...this.isNewCO && { diff: newVal !== this.state[field].oriVal },
                err: { message: '' }
            }
        })

        // const fieldObj = { ...this.state[field] }
        // fieldObj.curVal = newVal
        // fieldObj.err = false
        // if (!this.isNewCO) fieldObj.diff = fieldObj.curVal !== fieldObj.oriVal
        // this.setState({ [field]: fieldObj, err: { message: '' } })
    }
    setFieldError = (field, err) => {
        this.setState({ [field]: { ...this.state[field], err } })
    }
    handleAmountInputChange = (e, { value }) => {
        console.log(value)
    }
    render() {
        const { dateLocal, amount, loading } = this.state
        const requiredIsEmpty = this.requiredFields.some(f => !this.state[f].curVal)
        const diff = this.fields.map(f => this.state[f].diff).includes(true)
        const err = this.fields.map(f => this.state[f].err).find(err => err.message) || {}
        return (
            <Fragment>
            <SCardSection secondary={1}>
                {/* <Segment secondary basic> */}
                    <Header>
                        Коммерческое предложение
                    </Header>
                    {/* <COFormContext.Provider value={{
                        state: this.state,
                        changeFormFieldValue: this.setFieldValue,
                        setFormFieldError: this.setFieldError
                        #f3f4f5
                    }}> */}
                    <Form>
						<Form.Field inline>
							<SLabel>Дата</SLabel>
                            <LocalDatePicker
                                value={dateLocal.curVal}
                                setFormFieldValue={this.setFieldValue}
                                setFormFieldError={this.setFieldError}
                                err={dateLocal.err}
                                // selectDay={(newVal) => this.setFieldValue('dateLocal', newVal)} 
                                />
                            <Span pl='6px'>{dateLocal.curVal}</Span>
						</Form.Field>
                        <Form.Field inline error={!!amount.err.message} required>
							<SLabel>Сумма</SLabel>
                            <Input type='number'
                                placeholder='Сумма КП в рублях' 
                                value={amount.curVal}
                                onChange={this.handleAmountInputChange} />
                            <Span pl='6px' fs='1.1rem'>₽</Span>
						</Form.Field>
					</Form>
                    {/* </COFormContext.Provider> */}
                {/* </Segment> */}
            </SCardSection>
            <SCardSection secondary={1}>
                <Message
                    error
                    hidden={!err.message}
                    header={err.title}
                    content={err.message} />
                {/* <LabelImitator /> */}
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