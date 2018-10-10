import _ from 'lodash'

const ProdsByDept = ({ prods, selectedIds, orderId, children }) => {
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
          selected: selectedIds.includes(p.id),
          disabled: !!p.order && p.order.id !== orderId
        }))
      }
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
      depts.push(dept)
      // console.log('available > ', dept.available)
      return depts
    }, [])
  console.log('depts > ', depts)
  return children({ depts })
}

export default ProdsByDept
