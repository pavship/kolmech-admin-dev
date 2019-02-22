import React, { Component } from 'react'
import { Input } from '../styled/styled-semantic'
import { connect, getIn } from 'formik'

import FormikCurrency from './FormikCurrency'
import { Dropdown } from 'semantic-ui-react';

class FormikInput extends Component {
	render() {
		const {
			formik,
			name,
			...rest
		} = this.props
		const value = getIn(formik.values, name)
		if (this.props.options) return (
			<Dropdown
				{...rest}
				selection
				value={value}
				onChange={(e, {value}) => formik.setFieldValue(name, value)}
			/>
		)
		if (name.endsWith('amount')) return (
			<FormikCurrency
				name={name}
				value={value}
				setField={formik.setFieldValue}
			/>
		)
		return (
			<Input
				{...rest}
				w='100%'
				name={name}
				value={value}
				error={getIn(formik.touched, name) && !!getIn(formik.errors, name)}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		)
	}
}

export default connect(FormikInput)