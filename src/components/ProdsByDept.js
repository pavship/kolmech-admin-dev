import _ from 'lodash'

const ProdsByDept = ({ prods, selectedIds, orderId, orderProdsQty, children }) => {
  const mode = 
    orderId
    ? 'extra'
    : 'order'
  const depts = _(prods)
    .sortBy(['dept.type', 'dept.name'])
    .groupBy('dept.name')
    .reduce(function(depts, prods) {
      let dept = {
        ...prods[0].dept,
        count: prods.length,
        readyCount: _.countBy(prods, _.matches({ 'progress': 100 })).true,
        hasDefect: _.countBy(prods, 'hasDefect').true,
        isSpoiled: _.countBy(prods, 'isSpoiled').true,
        prods: prods.map(p => ({
          ...p,
          ...mode === 'extra' && {
            selected: selectedIds.includes(p.id),
            disabled: !!p.order && p.order.id !== orderId
          }
        }))
      }
      if (mode === 'extra') {
        dept = {
          ...dept,
          selectedCount: _.countBy(dept.prods, 'selected').true || 0,
          disabledCount: _.countBy(dept.prods, 'disabled').true || 0,
          availCount: dept.count - (_.countBy(dept.prods, 'disabled').true || 0),
          disabled: _.every(dept.prods, 'disabled'),
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
  if (mode === 'order') {
    const unreservedProdsCount = 
      orderProdsQty - depts.reduce(
        (prodCount, d) => prodCount += d.prods.length
      , 0)
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
