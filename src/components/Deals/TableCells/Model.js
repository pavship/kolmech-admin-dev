import React, { useState, useEffect, useRef } from 'react'
import { Icon, Input as SInput } from 'semantic-ui-react';
import { Div } from '../../styled/styled-semantic';
import { Mutation } from 'react-apollo';
import { upsertModelToDeal } from '../../../graphql/deal';

import styled from 'styled-components'

const Input = styled(SInput)`
  width: 180px;
`

export default ({
  notify,
  deal,
  model,
}) => {
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (inputRef.current && inputRef.current.focus()) || undefined)
  const iniModelName = model.name || ''
  const [ modelName, setModelName ] = useState(iniModelName)
  return <>
    {!editMode
      ? !(model.id === 0)
        ? <Div
            h='19.09px'
            onClick={() => setEditMode(true)}
          >
            {model.name}
          </Div>
        : <Icon
            link
            name='plus'
            onClick={() => setEditMode(true)}
          />
      : <Mutation
          mutation={upsertModelToDeal}
          onCompleted={(res) => console.log('res > ', res) || notify({
            type: 'success',
            title: 'Модель изделия сохранена'
          })}
          onError={err => notify({
            type: 'error',
            title: 'Ошибка. Модель изделия не сохранена',
            content: err.message,
          })}
        >
          {(upsertModelToDeal, { loading: upsertingModelToDeal }) =>
            <Input
              ref={inputRef}
              loading={upsertingModelToDeal}
              disabled={upsertingModelToDeal}
              placeholder='Введите наименование'
              value={modelName}
              onChange={(e, { value }) => setModelName(value)}
              onBlur={async () => {
                if (modelName !== iniModelName && modelName !== '')
                  await upsertModelToDeal({
                    variables: { name: modelName, modelId: model && model.id, dealId: deal.id }
                  })
                setEditMode(false)
                setModelName('')
              }}
              // action={<Icon basic floating options={options} defaultValue='page' />}
              // action={<Button
              //   disabled
              //   icon='check'
              //   // circular={true}
              //   // link={true}
              //   onClick={() => console.log('sdffds')}
              // />}
              // icon={{
              //   disabled: true,
              //   name: 'check',
              //   circular: true,
              //   link: true,
              //   color: 'green',
              //   onClick: e => {
              //     inputRef.current.focus()
              //     console.log('sdffds')
              //   }
              // }}
            />
          }
        </Mutation>
    }
  </>
}