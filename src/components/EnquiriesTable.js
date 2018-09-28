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
	console.log('enquiries > ', enquiries)
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
												onClick={() => 
													setDetails({
														type: 'Enquiry',
														id
													})
												}
											>
											</TableRow>
											{	isExpanded && enquiry.orders.map(order => (
												<TableRow
													key={order.id}
													entity={order}
													tableFields={tableFields}
													rowFields={[{
														path: 'num',
														value: enquiry.num + '-' + order.num
													},{
														path: 'lastCoEvents.0.doc.amount',
														correctPath: 'amount'
													}]}
													// active={details && details.type === 'Order' && id === details.id}
													// onClick={() => {
													// 	setDetails({
													// 		type: 'Order',
													// 		id
													// 	})
													// }}
												>
												</TableRow>
											))}
										</Fragment>
									)
								})}
						</Fragment>}
					</Table>
							{/* <Caret name='dropdown' active={activeIndex.includes(name) ? 1 : 0} /> */}
							{/* {name} <ProdQtyLabel color='grey' basic content={`${prods.length}шт`} /> */}
					{/* <STable>
						<tbody>
							{enquiries.map(({ id, num, dateLocal, org, model, qty, curStatusEvents, lastCoEvents, orders }) => {
								return (
									<Fragment
										key={id}
									>
										<EnquiryRow
											// @ts-ignore
											active={details && details.type === 'Enquiry' && id === details.id}
											onClick={() => {
												setDetails({
													type: 'Enquiry',
													id
												})
											}}
										>
											<Td></Td>
											<Td>{num}</Td>
											<Td>{dateLocal}</Td>
											<Td>
												{org && org.name}
											</Td>
											<Td>{model.name}</Td>
											<Td>{qty}</Td>
											<Td>{lastCoEvents[0] && currency(lastCoEvents[0].doc.amount)}</Td>
											<Td>{curStatusEvents[0] && curStatusEvents[0].status.name}</Td>
											<Td></Td>
										</EnquiryRow>
										{	orders.map(({ id, dateLocal, qty, amount }) => (
											<EnquiryRow
												key={id}
												// @ts-ignore
												active={details && details.type === 'Order' && id === details.id}
												onClick={() => {
													setDetails({
														type: 'Order',
														id
													})
												}}
											>
												<Td></Td>
												<Td>{num}</Td>
												<Td>{dateLocal}</Td>
												<Td>
												</Td>
												<Td>{model.name}</Td>
												<Td>{qty}</Td>
												<Td>{currency(amount)}</Td>
												<Td>{curStatusEvents[0] && curStatusEvents[0].status.name}</Td>
												<Td></Td>
											</EnquiryRow>
										))}
									</Fragment>
								)
							})}
						</tbody>
					</STable> */}
				</Fragment>
			)}
		</GlobalContext>
	)
}

export default EnquiriesTable