import React from 'react'
import produce from 'immer'

import { Query } from 'react-apollo'
import { orgLocal } from '../graphql/org'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Header, Button, Span } from './styled-semantic/styled-semantic'

import GlobalContext from './special/GlobalContext'
import EnquiriesSubmenu from './EnquiriesSubmenu'

const MenuDiv = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #7e7e81;
	/* border-top: 1px solid rgb(180, 181, 182); color of Chrome address section bottom border */
	border-top: 1px solid rgb(160, 161, 162);
`

const ClosePanelIcon =  styled(Icon)`
	&&& {
		margin-left: auto;
		margin-right: 8px;
	}
`

export default ({
	closePanel,
	refetchEnquiries,
	enquiriesAreLoading,
	refreshToken
}) => {
	return (
		<GlobalContext>
			{({ bottomPanel, setBottomPanel }) =>
				<MenuDiv>
					<Query
						query={orgLocal}
						variables={{id: bottomPanel.orgId}}
					>
						{({ data }) => {
							if (data && data.orgLocal) return (
								<Header inline
									size='medium'
									content={`Представители \u00A0 ${data.orgLocal.name}`}
								/>
							)
							return null
						}}
					</Query>
					{/* <Button compact circular menu
						w='118.5px'
						ml='0'
						ta='left'
						activeColor='blue' 
						onClick={refetchEnquiries}
					>
						<Icon 
							name='refresh'
							color={enquiriesAreLoading ? 'blue' : undefined} 
							loading={enquiriesAreLoading}
						/>
						{enquiriesAreLoading ? 'Загрузка' : 'Обновить'}
					</Button> */}
					<Button compact circular menu
						activeColor='green'
						icon='plus'
						// content=''
						active={ !bottomPanel.id }
						// onClick={() => setBottomPanel({...bottomPanel, id:})}
						onClick={() => setBottomPanel(
							produce(bottomPanel, draftPanel => delete draftPanel.id)
						)}
					/>
					{/* {details && (
						(details.type === 'Enquiry' && details.id !== 'new')
						|| (details.type === 'Order' && details.id === 'new')
					) &&
						<EnquiriesSubmenu />
					}
					<Query query={orgLocal}>
						{ ({ data }) => {
							if (data && data.me) {
								const { fName, lName } = data.me.person
								const menuNameTitle = fName + ' ' + (lName ? `${lName.slice(0,1)}.` : '')
								return (
									<Header inline
										ml='auto'
										size='small'
										content={menuNameTitle} 
									/>
							)} else return null
						}}
					</Query>
					<Icon link
						name='log out'
						size='large'
						onClick={() => refreshToken(null)} 
					/> */}
					<ClosePanelIcon 
						link
						name='cancel'
						size='large'
						onClick={closePanel}
					/>
				</MenuDiv>
			}
		</GlobalContext>
	)
}
