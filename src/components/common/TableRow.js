import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Caret } from '../styled-semantic/styled-semantic'

import { getObjProp } from '../../utils/object'
import { currency } from '../../utils/format'

const Row = styled.tr`
	font-size: 1rem;
	cursor: pointer;
	border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	:hover {
		background: rgba(0,0,0,.05);
		color: rgba(0,0,0,.95);
	}
	${props => props.secondary && `
		background: rgba(0,0,50,.02);
		${!props.lastSecondaryRow ? 'border-bottom: none;' : ''}
	`}
	${props => props.active && `
		background: rgba(0,0,0,.05);
		font-weight: bold;
		border-top: 1px solid rgba(34, 36, 38, 0.15);
		border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	`}
	${props => props.bold && `
		font-weight: bold;
	`}
`

const tdActiveStyle = `
	background: rgba(0,0,0,.12);
	.icon {
		opacity: 1 !important;
	}
`

const Td = styled.td`
	padding-right: 4px;
	white-space: nowrap;
	overflow: hidden;
  text-overflow: ellipsis;
	${props => props.service && `padding-left: 3px;`}
	${Row}:not(:hover) & {
		${props => props.type === 'onHover' && !props.active && `
			opacity: 0 !important;
		`}
	}
	${props => props.type === 'onHover' && `
		padding-left: 5px;
		transition: background .3s ease;
		:hover {
			${tdActiveStyle}
		}
		${props.active ? tdActiveStyle : ''}
		// ${props.active ? 'background: red !important;' : ''}
	`}
`

const TableRow = ({
	tableFields,
	rowFields = [],
	entity,
	expandFor,
	expanded,
	expand,
	select,
	...rest 
}) => {
	// rowFields have precedence over tableFields
	const fields = tableFields.map(f => rowFields.find(rf => rf.name === f.name) || f)
	const { selected, disabled } = entity
	return (
		<Row
			{...rest}
		>
			{fields.map(f => {
				if (
					f.name === 'service'
					&& typeof expanded !== 'undefined'
					&& entity[expandFor].length
				) return (
					<Td
						service
						key={f.name}
						onClick={(e) => {
							e.stopPropagation()
							expand()
						}}
					>
						<Caret
							active={expanded ? 1 : 0}
						/>
					</Td>
				)
				if (
					f.name === 'select'
					&& typeof select !== 'undefined'
				) return (
					<Td
						key={f.name}
						service
						onClick={(e) => {
							e.stopPropagation()
							select()
						}}
					>
						<Icon
							disabled={disabled}
							name={
								selected === 'partly' ? 'square' :
								selected 
									? 'check square outline'
									: 'square outline'
							}
						/>
					</Td>
				)
				if (f.content) return (
					<Td
						key={f.name}
					>
						{f.content}
					</Td>
				)
				let val = f.value || (f.path ? getObjProp(entity, f.path) : null)
				if (val && f.name === 'amount') val = currency(val)
				return (
					<Td
						key={f.name}
						type={f.type}
						active={f.active}
						onClick={!!f.onClick ? 
							e => {
								e.stopPropagation()
								f.onClick()
							}
							: undefined
						}
					>
						{val && f.icon &&
							<Icon
								link={!!f.onClick}
								name={f.icon}
								color={f.iconColor || undefined}
							/>
						}
						{val}
					</Td>
				)
			})}
		</Row>
	)
}

export default TableRow