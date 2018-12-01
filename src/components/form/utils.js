import { updatedDiff } from 'deep-object-diff';

export const projectEntity = (entity, schema) => {
  let result = {}
  handleObj(schema, entity, result)
  return result
}

export const preparePayload = (values, initialValues, schema) => {
  let result = {}
  handlePayloadObj(schema, initialValues, values, result)
  return result
}

const handleArr = (arrSchema, arr = [], resultArr) => {
  // NOTE schema array should contain one element only just to define schema
  const type = typeof arrSchema[0]
  // TODO handle array of primitives (now only collections)
  if (type === 'object') {
    return arr.length
      ? arr.forEach((obj, i) => handleObj(arrSchema[0], obj, resultArr[i] = {}))
      : handleObj(arrSchema[0], {}, resultArr[0] = {})
  }
}

const handleObj = (objSchema, obj = {}, result) => {
  // preserve ids of entity objects
  if (obj.id) result.id = obj.id
  Object.keys(objSchema).forEach(k => {
    const type = typeof objSchema[k]
    // NOTE form schema should contain only non-empty nested objects
    if (type === 'object' && Array.isArray(objSchema[k]))
      return handleArr(objSchema[k], obj[k], result[k] = [])
    if (type === 'object')
      return handleObj(objSchema[k], obj[k], result[k] = {})
    result[k] = obj[k] || objSchema[k]
  })
}

const handlePayloadObj = (objSchema, initialObj, obj, result) => {
  // preserve ids of entity objects
  if (obj.id) result.id = obj.id
  Object.keys(objSchema).forEach(k => {
    const type = typeof objSchema[k]
    console.log(k, type)
    // NOTE form schema should contain only non-empty nested objects
    if (type === 'object' && Array.isArray(objSchema[k]))
      return handlePayloadArr(objSchema[k], initialObj[k], obj[k], result[k] = [])
    if (type === 'object')
      return handlePayloadObj(objSchema[k], initialObj[k], obj[k], result[k] = {})
    result[k] =
      // result includes changed values
      obj[k] !== initialObj[k] ? obj[k] :
      // and non-empty initial values
      !!objSchema[k] ? objSchema[k]
      : undefined
    console.log('result[k] > ', k, result[k])
  })
}

const handlePayloadArr = (arrSchema, initialArr, arr, resultArr) => {
  // NOTE schema array should contain one element only just to define schema
  const type = typeof arrSchema[0]
  // TODO handle array of primitives (now only collections)
  if (type === 'object') {
    // arr should contain at least one element
    return arr.forEach((obj, i) => handleObj(arrSchema[0], initialArr[i], obj, resultArr[i] = {}))
  }
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