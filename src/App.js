import React, { Component, Fragment } from 'react'

import EnquiriesPage from './components/EnquiriesPage'

class App extends Component {
  render() {
	this.props.client.cache.reset()
	return (
		<Fragment>
			<EnquiriesPage />
		</Fragment>  
	)
  }
}

export default App;
