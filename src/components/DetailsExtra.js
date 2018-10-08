import React, { Fragment } from 'react'

import styled from 'styled-components'

import { Query } from 'react-apollo'
import { modelProds } from '../graphql/prod'

import GlobalContext from './special/GlobalContext'
import DetailsHeader from './DetailsHeader';

const Container = styled.div`
	/* flex-grow: 1; */
	width: 40%;
	border-left: 1px solid rgb(126, 126, 129);
`
	// width: ${props => props.extra ? '100%' : `calc(100% - ${props.theme.widths.extraSidebar})`
	// 	width: 100%;
	// 	` : `
	// 	width: 100%;
	// `}

const DetailsExtra = ({ closeExtra }) => {
	return (
		<GlobalContext>
			{({ extra, setExtra }) => (
				// <Query
				// 	query={modelProds}
				// 	variables={{ modelId }}
				// >
				// 	{({ loading, error, data }) => {
				// 		if (loading) return 'Загрузка...'
				// 		if (error) return `Ошибка ${error.message}`
				// 		console.log('data > ', data)
						// return (
							<Container>
								<DetailsHeader
									title='Наличие на участках'
									titleSize='small'
									closeExtra={closeExtra}
								/>
								{extra &&
									'Extra!'
								}
								{/* {type === 'Store'
									? <ModelProdsList
											modelId={modelId}
										/>
									:	null
								} */}
							</Container>
						// )
				// 	}}
				// </Query>
			)}
		</GlobalContext>
	)
}

export default DetailsExtra
