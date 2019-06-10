import React from 'react'
import { useMutation, useQuery } from '../../hooks/apolloHooks'
import { dealDetails as dD } from '../../../graphql/deal'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'
import Field from '../../form/Field'
import { upsertBatch as uBq } from '../../../graphql/batch'
import { getStructure, produceNested } from '../../form/utils'

export default function DealDetails ({
  dealId
}) {
  const { loading, data } = useQuery(dD, { variables: { id: dealId } })
  const [ upsertBatch ] = useMutation(uBq)
  return <>
    { loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> :
      data && data.deal && <Div
        p='1em 1em 1em 55px'
      >
        {data.deal.batches.map((b, bIndex) => {
          const {
            id,
            info,
            warning,
            model: {
              name,
              drawings: [{ name: drwName } = {}]
            },
            workpiece: wp,
            procs: [{ ops = [] } = {}]
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
          return <div key={id}>
            <p><b>{`${bIndex + 1}. ${name}`}</b></p>
            <Div
              pl='10px'
              bl='1px solid rgba(34, 36, 38, 0.15)'
            >
              <Field
                label='Чертеж'
                value={drwName || ''}
                onChange={value => upsertBatch({ variables: { input:
                  produceNested(batchStructure, 'model.drawings[0].name', value)
                }})}
              />
              <Field
                label='Заготовка'
                value={wpName || ''}
                onChange={value => upsertBatch({ variables: { input:
                  produceNested(batchStructure, 'workpiece.name', value)
                }})}
              />
              <Field
                label='Чертеж'
                indent
                value={wpDrwName || ''}
                onChange={value => upsertBatch({ variables: { input:
                  produceNested(batchStructure, 'workpiece.drawing.name', value)
                }})}
              />
              <Field
                label='Материал'
                value={material || ''}
                onChange={value => upsertBatch({ variables: { input:
                  produceNested(batchStructure, 'workpiece.material', value)
                }})}
              />
              <Field
                label='Твердость'
                value={hardness || ''}
                onChange={value => upsertBatch({ variables: { input:
                  produceNested(batchStructure, 'workpiece.hardness', value)
                }})}
              />
              <Field
                label='Замечание'
                type='textarea'
                value={info || ''}
                onChange={value => upsertBatch({ variables: { input:
                  produceNested(batchStructure, `info`, value)
                }})}
              />
              <Field
                label='Предупреждение'
                type='textarea'
                value={warning || ''}
                onChange={value => upsertBatch({ variables: { input:
                  produceNested(batchStructure, `warning`, value)
                }})}
              />
              {ops
                .filter(op => op.opType.opClass === 'MACHINING')
                .map(({
                  id,
                  opType,
                  description
                } = {}, opIndex) => {
                  const { name } = opType || {}
                  return <div key={id}>
                    <p><b>{`${bIndex + 1}.${opIndex + 1}. ${name}`}</b></p>
                    <Field
                      label='Описание'
                      type='textarea'
                      indent
                      value={description || ''}
                      onChange={value => upsertBatch({ variables: { input:
                        produceNested(batchStructure, `procs[0].ops[${opIndex}].description`, value)
                      }})}
                    />
                  </div>
                })}
            </Div>
          </div>
        })}
      </Div>
    }
  </>
}