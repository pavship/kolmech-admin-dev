import React, { Component } from 'react'

import { Input } from 'semantic-ui-react'

class CurrencyInput extends Component {
    handleInputChange = ( e, { value } ) => {
        // const { type } = this.props
        const newVal = parseInt(value, 10) || ''
        this.props.setFormFieldValue('qty', newVal)
    }
    render() {
        const { setFormFieldValue, ...rest } = this.props
        return (
            <Input {...rest}
                onChange={this.handleInputChange} 
            />
        )
    }
}

export default CurrencyInput
