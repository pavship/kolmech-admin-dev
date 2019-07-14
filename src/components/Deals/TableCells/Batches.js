import React from 'react'
import cuid from 'cuid'

import Batch from'./Batch'
import Model from './Model'

export default function Batches ({
  deal,
  upsertDeal
}) {
  return <>
    {deal.batches
      .sort((a, b) => a.sort - b.sort)
      .map((batch, batchIndex) =>
        <Batch
          batchIndex={batchIndex}
          key={batch.id}
          deal={deal}
          batch={batch}
          upsertDeal={upsertDeal}
        />)
    }
    <Model
      batch={{isNew: true}}
      deal={deal}
      upsertDeal={upsertDeal}
    />
  </>
}