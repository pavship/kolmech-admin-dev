import React, { Fragment } from 'react'

import styled from 'styled-components'

const STable = styled.table`
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
`

const HeaderRow = styled.tr`
	color: rgba(0,0,0,.8);
	background: #f3f4f5;
	border-top: 1px solid #d4d4d5;
	border-bottom: 1px solid #d4d4d5;
`

const Td = styled.td`
	padding-right: 4px;
	// @ts-ignore
	${props => props.w && `width: ${props.w};`}
`

const Table = ({ children, fields }) => {
	// const fields = {{
	// 	name: '',
	// 	title: '№'
	// },{
	// 	name: '',
	// 	title: 'Дата'
	// },{
	// 	name: '',
	// 	title: 'Организация'
	// },{
	// 	name: '',
	// 	title: 'Изделие'
	// },{
	// 	name: '',
	// 	title: 'Кол.'
	// },{
	// 	name: '',
	// 	title: 'Сумма'
	// },{
	// 	name: '',
	// 	title: 'Статус'
	// }}
	const fieldsExtended = [{ 
		path: 'serviceField', 
		width: '25px' 
	}, ...fields, {
		path: 'lastField',
	}]
	return (
		<STable><tbody>
			<Fragment>
				<HeaderRow>
					{fieldsExtended.map(f => {
						return (
						<Td
							key={f.path}
							// @ts-ignore
							w={f.width}
						>
							{f.title}
						</Td>
					)})}
				</HeaderRow>
				{children({
					tableFields: fieldsExtended.map(f => ({ path: f.path }))
				})}
			</Fragment>
		</tbody></STable>
	)
}

export default Table