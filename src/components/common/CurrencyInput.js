import React, { Component, Fragment } from 'react'

import NumberFormat from 'react-number-format'

import { Input } from 'semantic-ui-react'
import { Span } from '../styled-semantic/styled-semantic'

class CurrencyInput extends Component {
    render() {
        const { value, placeholder, setFormFieldValue } = this.props
        return (
            <Fragment>
                <NumberFormat
                    customInput={Input}
                    placeholder={placeholder}
                    value={value}
                    decimalSeparator=','
                    thousandSeparator=' '
                    decimalScale={2}
                    allowNegative={false}
                    onValueChange={values => setFormFieldValue('amount', values.floatValue)} />
                <Span pl='6px' fs='1.1rem'>₽</Span>
                <Span pl='9px' fs='1.1rem'>с НДС</Span>
            </Fragment>
        )
    }
}

export default CurrencyInput
