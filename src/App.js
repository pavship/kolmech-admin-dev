import React, { Component, Fragment } from 'react'

import EnquiriesPage from './components/EnquiriesPage'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <EnquiriesPage />
      </Fragment>  
    )
  }
}

export default App;
