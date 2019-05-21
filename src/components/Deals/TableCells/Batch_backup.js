import React, { useState, useEffect, useRef } from 'react'
import { Icon, Input as SInput } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { upsertDeal } from '../../../graphql/deal'
// import { dealFragmentMiddle } from '../../../graphql/deal'

import styled from 'styled-components'

const BatchContainer = styled.div`
  display: flex;
  width: 270px;
  z-index: 100;
  height: 19.09px;
`

const ModelInput = styled.input`
  width: 130px;
`

const QtyInput = styled.input`
  width: 34px;
  width: 134px;
`

const ModelDiv = styled.div`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: 1px solid rgba(34,36,38,0.15);
`

const QtyDiv = styled.div`
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ({
  notify,
  deal,
  model,
}) => {
  const inputRef = useRef(null)
  const qtyRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  const [ qtyEditMode, setQtyEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  useEffect(() => (qtyEditMode &&
    qtyRef.current &&
    qtyRef.current.focus()) || undefined)
  const iniModelName = model.name || ''
  const iniQty = model.qty || 0
  const [ modelName, setModelName ] = useState(iniModelName)
  const [ qty, setQty ] = useState(iniQty)
  return <>
    <Mutation
      mutation={upsertDeal}
      onCompleted={(res) => {
        // console.log('res > ', res)
        notify({
          type: 'success',
          title: 'Модель изделия сохранена'
        })
        setEditMode(false)
        setQtyEditMode(false)
      }}
      onError={err => notify({
        type: 'error',
        title: 'Ошибка. Модель изделия не сохранена',
        content: err.message,
      })}
    >
      {(upsertDeal, { loading: upserting }) => <>
        {!editMode
          ? !(model.id === 0)
            ? <BatchContainer>
                <ModelDiv
                  onClick={() => setEditMode(true)}
                >
                  {model.name}
                </ModelDiv>
                {qtyEditMode
                  ? <QtyDiv>
                      <QtyInput
                        ref={qtyRef}
                        placeholder='0'
                        value={qty}
                        onChange={({ target: { value }}) => setQty(value)}
                        onBlur={async () => {
                          if (qty !== iniQty)
                            await upsertDeal({ variables: { input: {
                              id: deal.id,
                              batches: [
                                ...deal.batches.map(({ id }) => ({ id })).filter(b => b.id !== model.batchId),
                                { id: model.batchId, qty }
                              ]
                            }}})
                          else setQtyEditMode(false)
                        }}
                      />
                    </QtyDiv>
                  : <QtyDiv
                      onClick={() => setQtyEditMode(true)}
                    >
                      {model.qty}
                    </QtyDiv>
                }
              </BatchContainer>
            : <Icon
                link
                name='plus'
                onClick={() => setEditMode(true)}
              />
          : <ModelInput
              ref={inputRef}
              placeholder='Новое Изделие'
              value={modelName}
              onChange={({ target: { value }}) => setModelName(value)}
              onBlur={async () => {
                if (modelName !== iniModelName && modelName !== '')
                  await upsertDeal({ variables: { input: {
                    id: deal.id,
                    batches: [
                      ...deal.batches.map(({ id }) => ({ id })).filter(b => b.id !== model.batchId),
                      {
                        id: model.batchId,
                        qty,
                        model: {
                          ...(model.id !== 0) && { id: model.id },
                          name: modelName,
                        }
                      }
                    ]
                  }}})
                else setEditMode(false)
              }}
            />
        }
      </>}
    </Mutation>
  </>
}