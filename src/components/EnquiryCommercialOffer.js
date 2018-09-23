import React, { Component, Fragment } from 'react'

import { Header, Form, Message, Button, Divider } from 'semantic-ui-react'
import { Div, A, Label, CardSection } from './styled-semantic/styled-semantic'

import LocalDatePicker from './common/LocalDatePicker'
import CurrencyInput from './common/CurrencyInput'
import SmartForm from './common/SmartForm'

import { toLocalISOString } from '../utils/dates'

class EnquiryCommercialOffer extends Component {
    render() {
        const { cancel, submit, loading } = this.props
        const isNewCO = this.props.id === 'new'
        const co = isNewCO
        ?   {
                dateLocal: toLocalISOString(new Date()).slice(0, 10),
                amount: ''
            } 
        :   {
                dateLocal: this.props.co.dateLocal,
                amount: this.props.co.amount
            }
        return (
            <SmartForm
                isNewEntity={isNewCO}
                entity={co}
                requiredFields={['dateLocal', 'amount']}
                submit={submit}
            >
                {({
                    disabled,
                    err,
                    setField,
                    submit,
                    formState: { dateLocal, amount }
                }) => <Fragment>
                    <CardSection head secondary >
                        <Header>
                            Коммерческое предложение
                        </Header>
                    </CardSection>
                    <CardSection secondary >
                        <Form>
                            <Form.Field inline>
                                <Label>Дата</Label>
                                <LocalDatePicker
                                    field={dateLocal}
                                    setField={setField}
                                />
                            </Form.Field>
                            <Form.Field inline required>
                                <Label>Сумма</Label>
                                <CurrencyInput
                                    field={amount}
                                    setField={setField}
                                    placeholder='Введите сумму КП'
                                />
                            </Form.Field>
                        </Form>
                    </CardSection>
                    <CardSection secondary minor>
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
                            content={'Создать'}
                            disabled={disabled}
                            loading={loading}
                            onClick={submit} />
                        <A cancel onClick={cancel}>Отмена</A>
                    </CardSection>
                    <Divider fitted/>
                </Fragment>}
            </SmartForm>
        )
    }
}

export default EnquiryCommercialOffer