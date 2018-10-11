import _ from 'lodash'

const ProdsByDept = ({
    children,
    prods,
    // extra
    selectedIds,
    orderId,
    // order
    selectedProds,
    orderProdsQty,
    // epxpand
    expandedIds,
}) => {
  const modes = {
    ...orderId && { extra: true },
    ...!orderId && { order: true },
    ...expandedIds && { expand: true },
  }
  const allProds =
    modes['extra'] ? prods :
    modes['order'] ? [...prods, ...selectedProds] : []
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
        prods: prods.map(p => ({
          ...p,
          ...modes['extra'] && {
            selected: selectedIds.includes(p.id),
            disabled: !!p.order && p.order.id !== orderId
          },
          ...modes['order'] && {
            added: !prods.some(prod => prod.id === p.id),
            removed: !selectedProds.some(sp => sp.id === p.id),
          },
        })),
      }
      if (modes['extra']) {
        const disabledCount = dept.prods.filter(p => p.disabled).length || 0
        dept = {
          ...dept,
          selectedCount: dept.prods.filter(p => p.selected).length || 0,
          disabledCount,
          availCount: dept.count - disabledCount,
          disabled: dept.prods.every(p => p.disabled),
        }
        dept = {
          ...dept,
          selected:
            dept.selectedCount === dept.availCount ? true :
            dept.selectedCount === 0 ? false :
            'partly'
        }
      }
      depts.push(dept)
      return depts
    }, [])
  if (modes['order']) {
    const unreservedProdsCount = orderProdsQty - selectedProds.length
    if (unreservedProdsCount) {
      depts.push({
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
