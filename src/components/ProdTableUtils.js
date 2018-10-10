import React, { Component } from 'react'
import _ from 'lodash'
import { compose, graphql } from 'react-apollo'
import { getLayout, getLayoutOptions, setLayout, setExpanded } from '../graphql/layout'

class ProdTableUtils extends Component {
	select = (id) => {
		const { depts } = this.props
		const entity = _.find(depts, { id })
		console.log('entity > ', entity)
	}
	render () {
		const { children } = this.props
		return children({
			select: this.select
		})
	}
}

export default compose(
	// graphql(getLayout, getLayoutOptions),
	// graphql(setLayout, { name: 'setLayout' }),
	// graphql(setExpanded, { name: 'setExpanded' }),
)(ProdTableUtils)