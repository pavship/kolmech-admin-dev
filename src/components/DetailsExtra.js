import React, { Fragment } from 'react'

import styled from 'styled-components'
import { Section } from '../components/styled-semantic/styled-semantic'

import { Query } from 'react-apollo'
import { modelLocal } from '../graphql/model'
import { modelProds } from '../graphql/prod'

import GlobalContext from './special/GlobalContext'
import DetailsHeader from './DetailsHeader'
import ProdsByDept from './ProdsByDept'
import DeptProdTable from './DeptProdTable'

const Container = styled.div`
	width: 40%;
	min-height: calc(100vh - 36px);
	height: fit-content;
	/* border-left: 1px solid rgb(126, 126, 129); */
	border-left: 1px solid rgb(156, 156, 159);
`

const DetailsExtra = ({ closeExtra }) => {
	return (
		<GlobalContext>
			{({ extra, selectedProdIds }) => (
				<Container>
					{!!extra && 
						<Fragment>
							<Query
								query={modelLocal}
								variables={{ id: extra.modelId }}
							>
								{({ data: { modelLocal } }) =>
									<DetailsHeader
										title={modelLocal.name + ' в наличии'}
										titleSize='small'
										closeExtra={closeExtra}
									/>
								}
							</Query>
							<Query
								query={modelProds}
								variables={{ modelId: extra.modelId }}
							>
								{({ loading, error, data }) => {
									if (loading) return <Section noIndent >Загрузка...</Section>
									if (error) return <Section noIndent >Ошибка {error.message}</Section>
									return (
										<ProdsByDept
											prods={data.modelProds}
											selectedIds={selectedProdIds}
											orderId={extra.orderId}
										>
											{({ depts }) =>
												<DeptProdTable
													depts={depts}
												/>
											}
										</ProdsByDept>
									)
								}}
							</Query>
						</Fragment>
					}
				</Container>
						
			)}
		</GlobalContext>
	)
}

export default DetailsExtra
