import { useMutation } from "./apolloHooks"
import produce from "immer"
import { upsertDeal } from "../../graphql/deal"
import { upsertBatch } from "../../graphql/batch"
import { getStructure, assignNested } from "../form/utils"

export default function useUpsert(
  objTypeName, obj, options
) {
  const mutation =
    objTypeName === 'deal' ? upsertDeal :
    objTypeName === 'batch' ? upsertBatch :
    undefined
  const [ mutate ] = useMutation(mutation, options)
  // const upsert = (draftHandler, options) =>
  //   mutate({
  //     ...options,
  //     variables: { input:
  //       produce(getStructure(obj), draftHandler)
  //     }
  //   })
  const upsert = (pathsAndValuesArr, options) => {
    console.log('pathsAndValuesArr > ', pathsAndValuesArr)
    if (pathsAndValuesArr.length % 2 !== 0)
      throw new Error('useUpsert requires first array argument consisting of alternating paths and values')
    mutate({
      ...options,
      variables: { input:
        produce(getStructure(obj), draft => {
          for (let i = 0; i < pathsAndValuesArr.length; i = i + 2) {
            if (i%2 === 1) continue
            console.log('pathsAndValuesArr[i], pathsAndValuesArr[i+1] > ', pathsAndValuesArr[i], pathsAndValuesArr[i+1])
            assignNested(draft, pathsAndValuesArr[i], pathsAndValuesArr[i+1], i>0)
          }
        })
      }
    })
  }
  return [ upsert ]
}