import React, { useState } from 'react'
import Menu from '../../Details/Menu/Menu'
import { useMutation, useQuery } from '../../hooks/apolloHooks'
import {
  CODetails as CODetailsQuery,
  createCO as createCOQuery
} from '../../../graphql/deal'
import { toLocalDateString } from '../../../utils/dates'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'
import Field from '../../form/Field'

export default ({
  details: { id },
  setDetails
}) => {
  const { loading, data } = useQuery(CODetailsQuery, { 
    variables: { id },
    errMsg: 'query error!'
  })
  const [ createCO ] = useMutation(createCOQuery, {
    variables: { id },
    successMsg: 'mutation completed!',
    errMsg: 'mutation error!',
  })
  const [ date, setDate ] = useState(toLocalDateString(new Date()))
  const { batches = [] } = (data && data.CODetails) || {}
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
        {batches.map(({
          model: { name }
        }, i) => <p><b>
          {`${i}. ${name}`}
        </b></p>)}
      </Div>
    }
  </>
}