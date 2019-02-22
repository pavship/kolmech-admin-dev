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
			type,
			options,
			...rest
		} = this.props
		const value = getIn(formik.values, name)
		// if (handleSearchChange) return (
		// 	<Dropdown
		// 		fluid
		// 		selection
		// 		multiple={multiple}
		// 		search={search}
		// 		options={options}
		// 		value={value}
		// 		placeholder='Поиск в AmoCRM'
		// 		onChange={(e, {value}) => formik.setFieldValue(name, value)}
		// 		onSearchChange={this.handleSearchChange}
		// 		disabled={isFetching}
		// 		loading={isFetching}
		// 	/>
		// )
		if (options) return (
			<Dropdown
				{...rest}
				selection
				value={value}
				options={options}
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