import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useQuery } from './hooks/apolloHooks'
import { me as meQuery } from '../graphql/user'
import UserContext from './context/UserContext'

import EnquiriesPage from './Enquiry/EnquiriesPage'
import PaymentsPage from './Payments/Page'
import DealsPage from './Deals/Page'

export default function Root () {
	const { data, loading, error } = useQuery(meQuery)
	const me = data && data.me
	return <Router><>
		{!error && loading ? 'Загрузка..' :
			<UserContext.Provider
				value={me}
			>
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<EnquiriesPage />
						)}
					/>
					<Route
						path="/pay"
						render={() => (
							<PaymentsPage />
						)}
					/>
					<Route
						path="/deals"
						render={() => (
							<DealsPage />
						)}
					/>
					<Redirect to="/" />
				</Switch>
			</UserContext.Provider>
		}
	</></Router>
}
