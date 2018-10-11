import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
// import { getLists, getListsOptions, setList } from '../graphql/lists'

import cloneDeep from 'lodash/cloneDeep'
import without from 'lodash/without'
import union from 'lodash/union'
import difference from 'lodash/difference'
import find from 'lodash/fp/find'

class ProdTableUtils extends Component {
	select = (id) => {
		const depts = cloneDeep(this.props.depts)
		const { setList } = this.props
		const selectedProdIds = depts.reduce((list, d) => [...list, ...d.prods.filter(p => p.selected).map(p => p.id)], [])
		const dept = find({ id }, depts) || find({ prods: [ { id } ]}, depts)
		const prods = dept.prods
		const entity = dept.id === id ? dept : find({ id }, prods)
		if (entity.disabled) return null
		let newList = []
		if (entity.__typename === 'Prod') {
			newList = selectedProdIds.includes(id) ? without(selectedProdIds, id) : [...selectedProdIds, id]
		}
		if (entity.__typename === 'Dept') {
			if (entity.selected === true) newList = difference(selectedProdIds, prods.map(p => p.id))
			if ([ 'partly', false ].includes(entity.selected)) newList = union(selectedProdIds, prods.map(p => !p.disabled && p.id))
		}
		setList(newList)
	}
	render () {
		const { children } = this.props
		return children({
			select: this.select
		})
	}
}

export default ProdTableUtils