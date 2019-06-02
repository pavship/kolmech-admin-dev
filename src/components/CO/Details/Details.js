import React, { useState, useEffect } from 'react'
import { Menu } from '../../Details/Menu/Menu'
import { useMutation, useQuery } from '../../hooks/apolloHooks'
import {
  CODetails as CODq,
  createCO as cCOq
} from '../../../graphql/deal'
import { toLocalDateString } from '../../../utils/dates'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'
import Field from '../../form/Field'
import { upsertBatch as uBq } from '../../../graphql/batch'
import { getStructure, produceNested } from '../../form/utils'
import produce from 'immer'

export const CODetails = ({
  details: { id },
  setDetails
}) => {
  const { loading, data } = useQuery(CODq, { variables: { id } })
  const [ createCO ] = useMutation(cCOq, { variables: { id } })
  const [ upsertBatch ] = useMutation(uBq)
  const [ date, setDate ] = useState(toLocalDateString(new Date()))
  const [ batches, setBatches ] = useState([])
  useEffect(() => data && data.deal && setBatches(data.deal.batches), [ data ])
  // const { batches = [] } = (data && data.deal) || {}
  // const { batches = [] } = deal || {}
  console.log('data > ', data)
  console.log('batches > ', batches)
  return <>
    <Menu
      setDetails={setDetails}
      title='Создать КП'
      onSubmit={() => createCO()}
    />
    { loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> :
      data && <Div
        p='1em 1em 1em 55px'
      >
        <Field
          label='Дата'
          type='date'
          value={date}
          onChange={date => setDate(date)}
        />
        {batches.map((b, i) => {
          const {
            id,
            model: {
              name,
              drawings: [{ name: drwName } = {}]
            },
            workpiece: wp
          } = b
          const {
            name: wpName,
            material,
            hardness,
            drawing: wpDrw
          } = wp || {}
          const {
            name: wpDrwName
          } = wpDrw || {}
          const batchStructure = getStructure(b)
          console.log('batchStructure > ', batchStructure)
          return <div key={id}>
            <p><b>{`${i + 1}. ${name}`}</b></p>
            <Field
              label='Чертеж'
              value={drwName}
              onChange={value => upsertBatch({ input:
                produceNested(batchStructure, 'model.drawings[0].name', value)
              })}
            />
            <Field
              label='Заготовка'
              value={wpName}
              onChange={value => upsertBatch({ input:
                produceNested(batchStructure, 'workpiece.name', value)
              })}
            />
            <Field
              label='Чертеж'
              indent
              value={wpDrwName}
              onChange={value => upsertBatch({ input:
                produceNested(batchStructure, 'workpiece.drawing.name', value)
              })}
            />
            <Field
              label='Материал'
              value={material}
              onChange={value => upsertBatch({ input:
                produceNested(batchStructure, 'workpiece.material', value)
              })}
            />
            <Field
              label='Твердость'
              value={hardness}
              onChange={value => upsertBatch({ input:
                produceNested(batchStructure, 'workpiece.hardness', value)
              })}
            />
          </div>
        })}
      </Div>
    }
  </>
}