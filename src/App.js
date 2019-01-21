import React from 'react'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styled/styled-semantic'

import Root from './components/Root'

const App = ({ client }) => (
	<ThemeProvider theme={theme}>
		<Root client={client} />
	</ThemeProvider>
)

export default App
