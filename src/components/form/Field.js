import React from 'react'
import styled from 'styled-components'

import HtmlDatePicker from '../common/HtmlDatePicker'

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-bottom: .67857143rem;
`

const Label = styled.div`
	flex: 0 0 122px;
	/* padding-top: calc(10.5rem/14); */
	font-size: calc(13rem/14);
	font-weight: bold;
	line-height: 1.21428571rem;
	${props => props.required && `
		::after {
			content: '*';
			display: inline-block;
			margin: -.2em 0 0 .2em;
			vertical-align: top;
			color: #db2828;
		}
	`}
`

const Content = styled.div`
	flex: 1 1 auto;
	max-width: calc(100% - 122px);
`

const InputContainer = styled.div`
	max-width: 240px;
`

const Error = styled.div`
	color: ${props => props.theme.colors.error};
`

export default ({
	label,
	required,
	type,
	contentBeforeField,
	error,
	...rest
}) => {
	return (
		<Container>
			<Label
				className='fz-formFieldLabel'
				required={required}
			>
				{label}
			</Label>
			<Content>
				<InputContainer>
					{contentBeforeField}
					{type === 'date'
						? <HtmlDatePicker
								{...rest}
							/>
						: <input />
					}
				</InputContainer>
				{error &&
					<Error>
						{error}
					</Error>
				}
			</Content>
		</Container>
	)
}
