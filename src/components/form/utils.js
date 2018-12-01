export const projectEntity = (entity, schema) => {
  let result = {}
  handleObj(schema, entity, result)
  return result
}

export const preparePayload = (values, initialValues, schema) => {

}

const handleArr = (arrSchema, arr = [], resultArr) => {
  // NOTE schema array should contain one element only just to define schema
  const type = typeof arrSchema[0]
  // TODO handle array of primitives (now only collections)
  if (type === 'object') {
    if (!arr.length) return handleObj(arrSchema[0], {}, resultArr[0] = {})
    else arr.forEach((obj, i) => handleObj(arrSchema[0], obj, resultArr[i] = {}))
  }
}

const handleObj = (objSchema, obj = {}, result) => {
  // preserve id of entity objects
  if (obj.id) result.id = obj.id
  Object.keys(objSchema).forEach(k => {
    const type = typeof objSchema[k]
    console.log(k, type)
    // NOTE form schema should contain only non-empty nested objects
    if (type === 'object' && Array.isArray(objSchema[k]))
      return handleArr(objSchema[k], obj[k], result[k] = [])
    if (type === 'object')
      return handleObj(objSchema[k], obj[k], result[k] = {})
    result[k] = obj[k] || objSchema[k]
  })
}

// const flatIni = flatten(initialValues)
// const flatEmp = emp && flatten(emp)
// // not-empty-initial-values are then added to payload (for new entities)
// const flatIniNotEmpty = {}
// Object.keys(flatIni).forEach(k => {
//   if (flatIni[k]) flatIniNotEmpty[k] = flatIni[k]
//   // initial blank values substituted by existing entity
//   if (emp && flatEmp[k]) flatIni[k] = flatEmp[k]
// })
// if (emp) initialValues = unflatten(flatIni)
// console.log('flatIniNotEmpty > ', flatIniNotEmpty)
// console.log('initialValues > ', initialValues)