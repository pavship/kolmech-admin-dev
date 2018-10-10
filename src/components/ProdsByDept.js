import _ from 'lodash'

const ProdsByDept = ({ prods, children }) => {
  const depts = _(prods)
    .sortBy(['dept.type', 'dept.name'])
    .groupBy('dept.name')
    .reduce(function(depts, prods) {
      const dept = {
        ...prods[0].dept,
        count: prods.length,
        readyCount: _.countBy(prods, _.matches({ 'progress': 100 })).true,
        hasDefect: _.countBy(prods, 'hasDefect').true,
        isSpoiled: _.countBy(prods, 'isSpoiled').true,
        prods
      }
      depts.push(dept)
      return depts
    }, [])
  console.log('depts > ', depts)
  return children({ depts })
}

export default ProdsByDept
