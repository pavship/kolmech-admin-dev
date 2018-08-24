import React, { Component, Fragment } from 'react'

import Root from './components/Root'

class App extends Component {
  render() {
	return (
		<Fragment>
			<Root token={this.props.token} />
		</Fragment>
	)
  }
}

export default App
