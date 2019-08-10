import React, { useState, useEffect, useRef, useContext } from 'react'
import { DealsContext } from '../../context/Context'
import { assignNested } from '../../../form/utils'
import { Div, Icon } from '../../../styled/styled-semantic'
import HtmlInput from '../../../common/HtmlInput'
import HtmlSelect from '../../../common/HtmlSelect'

export default function NewElement ({
  modelId,
  opClass,
  upsertBatch,
  newElementIndex
}) {
  const { opTypes } = useContext(DealsContext)
  const inputRef = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  const [ elementType, setElementType ] = useState('')
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  useEffect(() => (!!elementType &&
    inputRef2.current &&
    inputRef2.current.focus()) || undefined)
  useEffect(() => (!!elementType &&
    inputRef3.current &&
    inputRef3.current.focus()) || undefined)
  if (editMode)
    return <HtmlSelect
      ref={inputRef}
      options={[
        {id: 'op', name: 'Операция'},
        {id: 'proc', name: 'Техпроцесс'},
      ]}
      onChange={elementType => {
        setEditMode(false)
        setElementType(elementType)
      }}
      onBlur={() => setEditMode(false)}
    />
  if (elementType === 'op')
    return <HtmlSelect
      ref={inputRef2}
      options={opTypes.filter(ot => ot.opClass === opClass)}
      undefinedOptionName='выберите операцию'
      onChange={opTypeId => upsertBatch(draft => {
        const laborPrice = opTypes.find(opt => opt.id === opTypeId).laborPrice
        assignNested(draft, 'elements[length]', {
          op: {
            opTypeId,
            ...laborPrice && { laborPrice },
          },
          sort: newElementIndex
        })
      })}
      onBlur={() => setElementType('')}
    />
  if (elementType === 'proc')
    return <HtmlInput
      ref={inputRef3}
      placeholder='Новый техпроцесс'
      onChange={value => {
        upsertBatch(draft => {
          assignNested(draft, 'elements[length]', {
            proc: {
              name: value,
              modelId,
            },
            sort: newElementIndex
          })
        })
      }}
      onBlur={() => setElementType('')}
    />
  else
    return <Icon
      link
      name='plus'
      c='rgba(50,50,50,.87)'
      onClick={() => setEditMode(true)}
    />
}