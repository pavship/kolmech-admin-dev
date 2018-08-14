import React from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import { toLocalISOString } from '../utils'

const DatePicker = ({ selectedDate, handleDatePick }) => {
	return (
		<DayPickerInput
		value={toLocalISOString(selectedDate).slice(0, 10)}
		onDayChange={handleDatePick}
		dayPickerProps={{
			firstDayOfWeek: 1,
			month: selectedDate
		}}
		/>
	)
}

export default DatePicker
