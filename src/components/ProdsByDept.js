import _ from 'lodash'

const ProdsByDept = ({
    children,
    prods,
    // extra
    selectedIds,
    orderId,
    selectLimit,
    // order
    selectedProds,
    orderProdsQty,
    // epxpand
    expandedIds,
    expanded
}) => {
  const modes = {
    ...orderId && { extra: true },
    ...orderId && selectLimit === selectedIds.length && { limitReached: true },
    ...!orderId && { order: true },
    ...expandedIds && { expand: true },
    ...expanded && { expanded: true },
  }
  const allProds =
    modes['extra'] ? prods :
    modes['order'] ? _.unionBy(prods, selectedProds, 'id') : []
  const depts = _(allProds)
    .sortBy('dept.type')
    .groupBy('dept.name')
    .reduce(function(depts, prods) {
      let dept = { ...prods[0].dept }
      dept = {
        ...dept,
        count: prods.length,
        readyCount: prods.filter(p => p.progress === 100).length,
        hasDefect: prods.filter(p => p.hasDefect).length,
        isSpoiled: prods.filter(p => p.isSpoiled).length,
        ...modes['expand'] && {
          expanded: expandedIds.some(id => id === dept.id)
        },
        ...modes['expanded'] && {
          expanded: true
        },
        prods: prods.map(p => {
          let prod = {
            ...p,
            ...modes['extra'] && {
              selected: selectedIds.includes(p.id),
              ordered: !!p.order && p.order.id !== orderId
            },
            ...modes['order'] && {
              added: !prods.some(prod => prod.id === p.id),
              removed: !selectedProds.some(sp => sp.id === p.id),
            },
          }
          if (modes['extra']) {
            prod = {
              ...prod,
              disabled:
                prod.ordered
                || (modes['limitReached'] && !prod.selected)
            }
          }
          return prod
        }),
      }
      if (modes['extra']) {
        const orderedCount = dept.prods.filter(p => p.ordered).length || 0
        dept = {
          ...dept,
          selectedCount: dept.prods.filter(p => p.selected).length || 0,
          orderedCount,
          availCount: dept.count - orderedCount
        }
        dept = {
          ...dept,
          selected:
            dept.selectedCount === dept.availCount ? true :
            dept.selectedCount === 0 ? false :
            'partly'
        }
        dept = {
          ...dept,
          disabled:
            dept.prods.every(p => p.disabled)
            || (modes['limitReached'] && [false].includes(dept.selected))
        }
      }
      depts.push(dept)
      return depts
    }, [])
  if (modes['order']) {
    const unreservedProdsCount = orderProdsQty - selectedProds.length
    if (unreservedProdsCount) {
      depts.unshift({
        id: 'unreserved',
        name: 'Без резерва',
        count: unreservedProdsCount,
        prods: []
      })
    }
  }
  console.log('depts > ', depts)
  return children({ depts })
}

export default ProdsByDept
