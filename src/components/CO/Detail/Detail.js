import React, { useState, useEffect } from 'react'
import Menu from '../../Details/Menu/Menu'
import { useMutation, useQuery } from '../../hooks/apolloHooks'
import {
  CODetails,
  createCO as cCOq
} from '../../../graphql/deal'
import { toLocalDateString } from '../../../utils/dates'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'
import Field from '../../form/Field'
import { upsertBatch as uBq } from '../../../graphql/batch'
import { getStructure } from '../../form/utils'
import produce from 'immer';

export default ({
  details: { id },
  setDetails
}) => {
  const { loading, data } = useQuery(CODetails, { 
    variables: { id },
    errMsg: 'query error!'
  })
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
          } = wp || {}
          const batchStructure = getStructure(b)
          console.log('batchStructure > ', batchStructure)
          return <div key={id}>
            <p><b>{`${i + 1}. ${name}`}</b></p>
            <Field
              label='Чертеж'
              value={drwName}
              onChange={value => value !== drwName &&
                upsertBatch({ variables: {
                  input: produce(batchStructure, draft => {
                    const drw = draft.model.drawings[0]
                    if (drw) drw.name = value
                      else draft.model.drawings = [{ name: value }]
                  })
              }})}
            />
            <Field
              label='Заготовка'
              value={wpName}
              onChange={value => value !== wpName &&
                upsertBatch({ variables: {
                  input: produce(batchStructure, draft => {
                    const wp = draft.workpiece
                    if (wp) wp.name = value
                      else draft.workpiece = { name: value }
                  })
              }})}
            />
            <Field
              label='Чертеж'
              indent
              value={material}
              onChange={value => value !== material &&
                upsertBatch({ variables: {
                  input: produce(batchStructure, draft => {
                    const wp = draft.workpiece
                    if (wp) wp.material = value
                      else draft.workpiece = { material: value }
                  })
              }})}
            />
          </div>
        })}
      </Div>
    }
  </>
}