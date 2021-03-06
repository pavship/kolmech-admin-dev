import React, { Fragment } from 'react'

import styled from 'styled-components'

const STable = styled.table`
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
	/* TODO Make this table with scrollable tbody (Not trivial css trick) */
	/* thead, tbody, tr {
		display: block;
	} */
`

const TableHeaderRow = styled.tr`
	color: rgba(0,0,0,.8);
	line-height: 1.5em;
	background: rgb(233, 234, 235);
	border-top: 1px solid #d4d4d5;
	/* ${props => props.noTopBorder ? '' : 'border-top: 1px solid #d4d4d5;'} */
	border-bottom: 1px solid #d4d4d5;
	font-weight: bold;
`

const Td = styled.td`
	padding-right: 4px;
	// @ts-ignore
	${props => props.w && `width: ${props.w};`}
`

const TBody = styled.tbody`
	/* overflow-y: auto;
  overflow-x: hidden; */
`

const Table = ({
	children,
	expand,
	fields,
	indent,
	noServiceField,
	noTopBorder,
	select,
}) => {
	const modes =  {
		expand: !!expand,
		indent: !!indent,
		noServiceField: !!noServiceField,
		select: !!select,
	}
	const fieldsExtended = [
		...modes['indent'] ? [{
			name: 'indent',
			width: indent
		}] : [],
		...!modes['noServiceField'] ? [{
			name: 'service',
			width: '28px'
		}] : [],
		...modes['select'] ? [{
			name: 'select',
			width: '28px'
		}]: [],
		...fields,
		// lastField is needed to take remaining width in fixed table-layout
		{ name: 'lastField' }
	]
	return (
		<STable>
				<thead>
					<TableHeaderRow
						className='fz-tableHeaderRow'
					>
						{fieldsExtended.map(f =>{
							// console.log(f)
							return <Td
								key={f.name}
								// @ts-ignore
								w={f.width}
							>
								{f.title}
							</Td>
						})}
					</TableHeaderRow>
				</thead>
			<TBody>
				<Fragment>
					{children({
						tableFields: fieldsExtended.map(f => {
							const field = { ...f }
							delete field.width
							delete field.title
							return field
						}),
					})}
				</Fragment>
			</TBody>
		</STable>
	)
}

export default Table