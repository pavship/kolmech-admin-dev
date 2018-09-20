import React, { Component, Fragment } from 'react'

class SmartForm extends Component {
    constructor(props){
        super(props)
        this.componentIsMounted = true
        this.isNewEntity = props.isNewEntity
        // gather original form fields' values from provided object
        const oriEntity = props.entity
        this.fields = Object.keys(oriEntity)
        this.requiredFields = props.requiredFields
        // map through form fields and write helper props
        this.state = {}
        this.fields.forEach(key => {
            this.state[key] = {
                curVal: oriEntity[key],
                err: null,
                ...this.requiredFields.includes(key) && { required: true },
                ...!this.isNewEntity && {
                    oriVal: oriEntity[key],
                    diff: false,
                }
            }
        })
        // console.log(this.state)
    }
    setFieldValue = (field, newVal) => {
        console.log('change ', field, ' to value > ', newVal)
        this.setState({
            [field]: {
                ...this.state[field],
                curVal: newVal,
                ...this.isNewEntity && { diff: newVal !== this.state[field].oriVal },
                err: null,
            }
        })
    }
    setFieldError = (field, err) => {
        this.setState({ [field]: { ...this.state[field], err } })
    }
    submit = () => {
        const entity = this.fields.reduce((entity, f) => {
            entity[f] = this.state[f].curVal
            return entity
        }, {})
        this.props.submit(entity)
    }
    render() {
        const requiredIsEmpty = this.requiredFields.some(f => !this.state[f].curVal)
        const diff = this.isNewEntity ? null : this.fields.map(f => this.state[f].diff).includes(true)
        const err = this.fields.map(f => this.state[f].err).find(err => !!err) || null
        return (
            <Fragment>
                { this.props.children({
                    diff,
                    requiredIsEmpty,
                    err,
                    setFieldValue: this.setFieldValue,
                    setFieldError: this.setFieldError,
                    formState: this.state
                }) }
            </Fragment>
        )
    }
}

export default SmartForm