import React, { Fragment } from 'react'

import GlobalContext from './special/GlobalContext'

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

const DeptProdTable = ({ depts }) => {
	console.log('depts > ', depts)
	return (
		<GlobalContext>
			{({ details, setDetails, setExpanded }) => (
				<Fragment>
					<Table
						fields={fields}
					>
						{({ tableFields, expandedIds, toggleExpanded }) => <Fragment>
							{depts.map(dept => {
									const { id } = dept
									console.log('expandedIds > ', expandedIds)
									const isExpanded = expandedIds.includes(id)
									return (
										<Fragment
											key={id}
										>
											<TableRow
												entity={dept}
												tableFields={tableFields}
												expandFor='prods'
												expanded={isExpanded}
												setExpanded={() => toggleExpanded(id)}
												onClick={() => {
													toggleExpanded(id)
												}}
											>
											</TableRow>
											{	isExpanded && dept.prods.map((prod, i) => {
												const { id, num } = prod
												return (
													// @ts-ignore
													<TableRow
														secondary={1}
														lastSecondaryRow={i === dept.prods.length - 1 ? 1 : 0}
														key={id}
														entity={prod}
														tableFields={tableFields}
														rowFields={[{
															name: 'name',
															path: 'fullnumber'
														},
														// {
														// 	path: 'org.name',
														// 	value: dept.org.name
														// },{
														// 	path: 'model.name',
														// 	value: dept.model.name
														// },{
														// 	path: 'lastCoEvents.0.doc.amount',
														// 	correctPath: 'amount'
														// }
														]}
														// active={
														// 	details
														// 	&& details.type === 'Order'
														// 	&& id === details.id
														// }
														onClick={() => {
															// setDetails({
															// 	type: 'Order',
															// 	id
															// })
														}}
													>
													</TableRow>
												)
											})}
										</Fragment>
									)
								})}
						</Fragment>}
					</Table>
					{/* {name} <ProdQtyLabel color='grey' basic content={`${prods.length}шт`} /> */}
				</Fragment>
			)}
		</GlobalContext>
	)
}

export default DeptProdTable