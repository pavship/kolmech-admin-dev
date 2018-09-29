import React, { Fragment } from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

import { getObjProp } from '../../utils/object'
import { currency } from '../../utils/format'

const Row = styled.tr`
	font-size: 1rem;
	cursor: pointer;
	&:hover {
		background-color: rgba(0,0,0,.03);
	}
	// @ts-ignore
	${props => props.active && `{
		background-color: rgba(0,0,0,.03);
		font-weight: bold;
	}`}
	${props => props.secondary && `{
		background-color: rgba(0,0,50,.02);
		// >td {
		// 	padding-left: 3px;
		// }
	}`}
	border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`

const Td = styled.td`
	padding-right: 4px;
	${props => props.service && `
		padding-left: 3px;
		&:hover {
			background: white !important;
		}`
	}
`

const Caret = styled(Icon)`
  transform: ${props => !props.active && 'translateX(-3px) translateY(3px) rotate(-90deg) !important'};
`

const TableRow = ({ tableFields, rowFields, entity, expandFor, expanded, setExpanded, ...rest }) => {
	console.log('entity > ', entity)
	const fields = !rowFields
		? tableFields
		: rowFields.reduce((fields, rf) => {
				const f = fields.find(tf => rf.path === tf.path)
				if (!f) return fields
				if (rf.correctPath) f.path = rf.correctPath
				if (rf.value) f.value = rf.value
				return fields
			}, tableFields.map(f => ({...f})))
	return (
		<Row
			{...rest}
		>
			{fields.map(f => {
				let val = f.value || getObjProp(entity, f.path)
				if (val && f.path.indexOf('amount') !== -1) val = currency(val)
				if (
					f.path === 'serviceField'
					&& typeof expanded !== 'undefined'
					&& entity[expandFor].length
				) return (
					<Td
						service
						key={f.path}
						onClick={(e) => {
							console.log('e > ', e)
							e.stopPropagation()
							setExpanded({
								id: entity.id,
								value: !entity.isExpanded
							}
						)}}
					>
						<Caret
							name='dropdown'
							active={expanded ? 1 : 0}
						/>
					</Td>
				)
				return (
					<Td
						key={f.path}
					>
						{val}
					</Td>
				)
			})}
		</Row>
	)
}

export default TableRow