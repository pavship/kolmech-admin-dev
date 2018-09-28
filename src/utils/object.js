export const getObjProp = function(obj, path){
  for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      // console.log('path[i] > ', path[i] )
      obj = obj[path[i]]
      // console.log('obj > ', obj)
      if (!obj) return undefined
  }
  return obj
}