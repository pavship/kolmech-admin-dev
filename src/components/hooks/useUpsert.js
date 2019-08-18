import { useMutation } from "./apolloHooks"
import produce from "immer"
import { upsertDeal } from "../../graphql/deal"
import { upsertBatch } from "../../graphql/batch"
import { getStructure } from "../form/utils"

export default function useUpsert(
  objTypeName, obj, options
) {
  const mutation =
    objTypeName === 'deal' ? upsertDeal :
    objTypeName === 'batch' ? upsertBatch :
    undefined
  const [ mutate ] = useMutation(mutation, options)
  const upsert = (draftHandler, options) =>
    mutate({
      ...options,
      variables: { input:
        produce(getStructure(obj), draftHandler)
      }
    })
  return [ upsert ]
}