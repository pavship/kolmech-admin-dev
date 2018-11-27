import React from 'react'

import { graphql, compose } from 'react-apollo'
import { allEnquiries } from '../graphql/enquiry'

import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

import EnquiriesMenu from './EnquiriesMenu'
import EnquiriesTable from './EnquiriesTable'
import DetailsSidebar from './DetailsSidebar'
import PanelPusher from './common/PanelPusher';
import EnquiriesBottomPanel from './EnquiriesBottomPanel';
import GlobalContext from './special/GlobalContext';

const Pushable = styled(Sidebar.Pushable)`
	min-height: calc(100vh - 36px) !important;
`

const EnquiriesPage = ({ 
	allEnquiries: { loading, error, refetch, networkStatus, enquiries },
	refreshToken
}) => {
	return <>
		<EnquiriesMenu
			refetchEnquiries={() => refetch()}
			enquiriesAreLoading={loading}
			refreshToken={refreshToken}
		/>
		{loading && "Загрузка..."}
		{error   && `Ошибка ${error.message}`}
		{enquiries &&
			<GlobalContext>
				{({ details }) =>
					<Pushable>
						<DetailsSidebar />
						<Sidebar.Pusher>
							<PanelPusher
								panel={ <EnquiriesBottomPanel /> }
								panelVisible={!!details}
							>
								<EnquiriesTable
									enquiries={enquiries}
								/>
							</PanelPusher>
						</Sidebar.Pusher>
					</Pushable>
				}
			</GlobalContext>
		}
	</>
}

export default compose(
	graphql(allEnquiries, {
			name: 'allEnquiries'
	})
)(EnquiriesPage)