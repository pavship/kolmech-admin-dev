import React from 'react'

import { Provider } from 'unstated'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styled/styled-semantic'

import { NotificationsProvider } from './components/notifications/NotificationsContext'
import NotificationsViewer from './components/notifications/NotificationsViewer'
import Root from './components/Root'

const App = ({ client }) => (
	<Provider>
		<NotificationsProvider>
		<NotificationsViewer />
		<ThemeProvider theme={theme}>
			<Root client={client} />
		</ThemeProvider>
		</NotificationsProvider>
	</Provider>
)

export default App
