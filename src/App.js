import React from 'react'

import { Provider } from 'unstated'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styled/styled-semantic'

import Root from './components/Root'

const App = ({ client }) => (
	<Provider>
		<ThemeProvider theme={theme}>
			<Root client={client} />
		</ThemeProvider>
	</Provider>
)

export default App
