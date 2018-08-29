import React, { Component, Fragment } from 'react'

import Root from './components/Root'

class App extends Component {
	render() {
		const {token, client} = this.props
		return (
			<Fragment>
				<Root token={token} client={client} />
			</Fragment>
		)
	}
}

export default App
