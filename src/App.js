import React from 'react'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styled/styled-semantic'

import { NotificationsProvider } from './components/notifications/NotificationsContext'
import { DiskProvider } from './components/context/DiskContext'
import { AuthProvider } from './components/auth/AuthContext'
import Root from './components/Root'

export default function App ({
	client
}) {
	return (
		<NotificationsProvider>
			<ThemeProvider theme={theme}>
				<DiskProvider>
					<AuthProvider client={client}>
						<Root />
					</AuthProvider>
				</DiskProvider>
			</ThemeProvider>
		</NotificationsProvider>
	)
}
