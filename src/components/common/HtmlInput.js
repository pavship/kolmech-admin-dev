import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'

const Input = styled.input`
	width: 100%;
  padding-right: 4px;
  padding-left: 4px;
`

export default ({
  value: propValue,
	onChange,
	...rest
}) => {
  const input = useRef(null)
  const [ value, setValue ] = useState('')
  useEffect(() => setValue(propValue || ''), [propValue])
	return (
		<Input
      {...rest}
      ref={input}
			value={value}
      onChange={({ target: { value }}) => setValue(value)}
      onBlur={() => propValue !== value && onChange(value)}
		/>
	)
}
