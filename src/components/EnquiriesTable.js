import React, { Fragment } from 'react'

import GlobalContext from './special/GlobalContext'

import Table from './common/Table'
import TableRow from './common/TableRow'

const fields = [{
	path: 'num',
	title: '№',
	width: '40px'
},{
	path: 'dateLocal',
	title: 'Дата',
	width: '110px'
},{
	path: 'org.name',
	title: 'Организация',
	width: '250px'
},{
	path: 'model.name',
	title: 'Изделие',
	width: '250px'
},{
	path: 'qty',
	title: 'Кол.',
	width: '50px'
},{
	path: 'lastCoEvents.0.doc.amount',
	title: 'Сумма',
	width: '105px'
},{
	path: 'curStatusEvents.0.status.name',
	title: 'Статус',
	width: '130px'
}]

const EnquiriesTable = ({ enquiries }) => {
	return (
		<GlobalContext>
			{({ details, setDetails, setExpanded }) => (
				<Fragment>
					<Table
						fields={fields}
					>
						{({ tableFields }) => <Fragment>
							{enquiries.map(enquiry => {
									const { id, isExpanded } = enquiry
									return (
										<Fragment
											key={id}
										>
											<TableRow
												entity={enquiry}
												tableFields={tableFields}
												expandFor='orders'
												expanded={isExpanded}
												setExpanded={setExpanded}
												active={
													details
													&& details.type === 'Enquiry'
													&& id === details.id
												}
												onClick={() => {
													setDetails({
														type: 'Enquiry',
														id
													})
													setExpanded({
														id,
														value: !isExpanded
													})
												}}
											>
											</TableRow>
											{	isExpanded && enquiry.orders.map((order, i) => {
												const { id, num } = order
												return (
													// @ts-ignore
													<TableRow
														secondary={1}
														lastSecondaryRow={i === enquiry.orders.length - 1 ? 1 : 0}
														key={id}
														entity={order}
														tableFields={tableFields}
														rowFields={[{
															path: 'num',
															value: enquiry.num + '-' + num
														},{
															path: 'model.name',
															value: enquiry.model.name
														},{
															path: 'lastCoEvents.0.doc.amount',
															correctPath: 'amount'
														}]}
														active={
															details
															&& details.type === 'Order'
															&& id === details.id
														}
														onClick={() => {
															setDetails({
																type: 'Order',
																id
															})
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

export default EnquiriesTable