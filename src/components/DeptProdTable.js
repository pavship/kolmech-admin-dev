import React, { Fragment } from 'react'

import { Icon, Label } from 'semantic-ui-react'

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
														// content: (
														// 	<Label basic>
														// 		<Icon name='checkmark' color='green' />
														// 			{dept.readyCount}
														// 		{/* <Label.Detail>ГП</Label.Detail> */}
														// 	</Label>
														// )
													}
												]}
											>
											</TableRow>
											{	isExpanded && dept.prods.map((prod, i) => {
												const { id, progress } = prod
												return (
													// @ts-ignore
													<TableRow
														secondary={1}
														lastSecondaryRow={i === dept.prods.length - 1 ? 1 : 0}
														key={id}
														entity={prod}
														tableFields={tableFields}
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