import React, { Component } from 'react'
import { connect, getIn } from 'formik'

// import DatePicker, { registerLocale } from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import ru from 'date-fns/locale/ru'

import styled from 'styled-components'
import FormikCurrency from './FormikCurrency'
import { Input } from '../styled/styled-semantic'
import { Dropdown } from 'semantic-ui-react'

// registerLocale('ru', ru )

// react-datepicker__time-list-item

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
		// if (type === 'date') return (
		// 	// <DatePicker
		// 	// 	locale='ru'
		// 	// 	showTimeSelect
		// 	// 	timeFormat="HH:mm"
		// 	// 	timeCaption='Время'
		// 	// 	dateFormat="yyyy-MM-dd h:mm"
		// 	// 	disabledKeyboardNavigation
		// 	// 	selected={value}
		// 	// 	onChange={pickedDate => {
		// 	// 		console.log('onChange!')
		// 	// 		formik.setFieldValue(name, pickedDate)}}
		// 	// 	onBlur={() => console.log('onBlur!')}
		// 	// 	onChangeRaw={e => {
		// 	// 		console.log('event.target.value > ', e.target.value)
		// 	// 		// this.handleChangeRaw(event.target.value)
		// 	// 	}}
		// 	// />
		// 	<Input
		// 		{...rest}
		// 		w='100%'
		// 		name={name}
		// 		value={value.slice(0,16)}
		// 		error={getIn(formik.touched, name) && !!getIn(formik.errors, name)}
		// 		onChange={formik.handleChange}
		// 		onBlur={formik.handleBlur}
		// 	/>
		// )
		if (options) return (
			<Dropdown
				{...rest}
				selection
				fluid
				search
				noResultsMessage='Ничего не найдено'
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
				value={type === 'date' ? value.slice(0,16) : value}
				error={getIn(formik.touched, name) && !!getIn(formik.errors, name)}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		)
	}
}

export default connect(FormikInput)