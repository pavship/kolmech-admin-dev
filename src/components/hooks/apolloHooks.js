import { useState, useContext, useEffect } from 'react'
import { useQuery as useQueryProto, useMutation as useHookMutation } from 'react-apollo-hooks'
import NotificationsContext from '../notifications/NotificationsContext'

export function useQuery(
  query,
  {
    onCompleted,
    onError,
    successMsg,
    errMsg,
    ...options
  } = {},
) {
  const { notify } = useContext(NotificationsContext)
  const { data, loading, error } = useQueryProto(query, options)
  useEffect(() => {
    if (onCompleted && !loading && !error) {
      onCompleted(data)
    } else if (!loading && error) {
      if (onError) onError(error)
      else notify({
        type: 'error',
        title: errMsg || 'Ошибка загрузки данных',
        content: error.message,
      })
    }
  }, [loading, data, error])
  return { data, loading, error }
}

export function useMutation(
  mutation,
  {
    onCompleted,
    onError,
    successMsg,
    errMsg,
    ...options
  } = {}
) {
  const { notify } = useContext(NotificationsContext)
  const [loading, setLoading] = useState(false)
  const [called, setCalled] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const mutate = useHookMutation(mutation, options)
  const handler = async (...args) => {
    setLoading(true)
    setCalled(true)
    setError(null)
    setData(null)
    try {
      const { data } = await mutate(...args)
      setData(data)
      setLoading(false)
      if (onCompleted) {
        onCompleted(data)
      } else notify({
        type: 'success',
        title: successMsg || 'Данные сохранены',
      })
      return { data }
    } catch (e) {
      setLoading(false)
      setError(e)
      if (onError) {
        onError(e)
      } else notify({
        type: 'error',
        title: errMsg || 'Ошибка сохранения',
        content: error.message,
      })
    }
  }
  return [
    handler,
    {
      loading,
      called,
      error,
      data
    }
  ]
}