import React, { Fragment } from 'react'

import styled from 'styled-components'
import { Section } from '../components/styled-semantic/styled-semantic'

import { Query } from 'react-apollo'
import { modelProds } from '../graphql/prod'

import GlobalContext from './special/GlobalContext'
import DetailsHeader from './DetailsHeader'
import ProdsByDept from './ProdsByDept'
import DeptProdTable from './DeptProdTable'

const Container = styled.div`
	width: 40%;
	/* border-left: 1px solid rgb(126, 126, 129); */
	border-left: 1px solid rgb(156, 156, 159);
`

const DetailsExtra = ({ closeExtra }) => {
	return (
		<GlobalContext>
			{({ extra, setExtra }) => (
				<Container>
					<DetailsHeader
						title='Наличие на участках'
						titleSize='small'
						closeExtra={closeExtra}
					/>
					{!!extra &&
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
					}
				</Container>
						
			)}
		</GlobalContext>
	)
}

export default DetailsExtra
