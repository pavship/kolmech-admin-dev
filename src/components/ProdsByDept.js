import _ from 'lodash'

const ProdsByDept = ({ prods, children }) => {
  const depts = _(prods)
    .sortBy(['dept.type', 'dept.name'])
    .groupBy('dept.name')
    .reduce(function(depts, prods) {
      const dept = {
        ...prods[0].dept,
        count: prods.length,
        prods
      }
      depts.push(dept)
      return depts
    }, [])
  return children({ depts })
}

export default ProdsByDept
