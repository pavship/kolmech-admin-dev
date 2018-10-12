import React, { Fragment } from 'react'

import Table from './common/Table'
import TableRow from './common/TableRow'

const fields = [{
	name: 'name',
	path: 'name',
	title: 'Участок / № Изделия',
	width: '150px'
},{
	name: 'progress',
	path: 'progress',
	title: 'Заверш.',
	width: '65px'
},{
	name: 'hasDefect',
	path: 'hasDefect',
	title: 'Отклон.',
	width: '65px'
},{
	name: 'isSpoiled',
	path: 'isSpoiled',
	title: 'Брак',
	width: '65px'
},{
	name: 'reserve',
	path: 'enquiry.num',
	title: 'Резерв',
	width: '85px'
}]

const DeptProdTable = ({
	depts,
	select,
	expand,
	skipFields = []
}) => {
	return (
		<Table
			fields={fields.filter(f => !skipFields.includes(f.name))}
			select={select}
			expand={expand}
		>
			{({ tableFields }) => <Fragment>
				{depts.map(dept => {
						const { id, expanded } = dept
						if (id === 'unreserved') return (
							<TableRow
								key={id}
								bold
								entity={dept}
								tableFields={tableFields}
								rowFields={[
									{
										name: 'name',
										value: dept.name + ' ('+ dept.count + ')'
									},
								]}
							/>
						)
						return (
							<Fragment
								key={id}
							>
								<TableRow
									entity={dept}
									tableFields={tableFields}
									expandFor='prods'
									expanded={expanded}
									expand={() => expand(id)}
									onClick={() => expand(id)}
									select={() => select(id)}
									rowFields={[
										{
											name: 'name',
											value: dept.name + ' ('+ dept.count + ')'
										},
										{
											name: 'progress',
											path: 'readyCount',
											icon: 'checkmark',
											iconColor: 'green'
										},
										{
											name: 'hasDefect',
											path: 'hasDefect',
											icon: 'warning sign',
											iconColor: 'orange'
										},
										{
											name: 'isSpoiled',
											path: 'isSpoiled',
											icon: 'broken chain',
											iconColor: 'red'
										},
										{
											name: 'reserve',
											path: 'orderedCount',
										},
									]}
								/>
								{	expanded && dept.prods.map((prod, i) => {
									const { id, progress } = prod
									return (
										// @ts-ignore
										<TableRow
											secondary={1}
											lastSecondaryRow={i === dept.prods.length - 1 ? 1 : 0}
											key={id}
											entity={prod}
											tableFields={tableFields}
											select={() => select(id)}
											rowFields={[
												{
													name: 'name',
													path: 'fullnumber'
												},
												{
													name: 'progress',
													value: progress && progress + '%'
												},
												{
													name: 'hasDefect',
													path: 'hasDefect',
													icon: 'warning sign',
													iconColor: 'orange'
												},
												{
													name: 'isSpoiled',
													path: 'isSpoiled',
													icon: 'broken chain',
													iconColor: 'red'
												},
											]}
											// active={}
											onClick={select && (() => select(id))}
										/>
									)
								})}
							</Fragment>
						)
					})}
			</Fragment>}
		</Table>
		// {/* {name} <ProdQtyLabel color='grey' basic content={`${prods.length}шт`} /> */}
	)
}

export default DeptProdTable