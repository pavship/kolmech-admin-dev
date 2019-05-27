import React, { useState, useEffect } from 'react'
// import { Mutation } from 'react-apollo'
// import { mergeOrg } from '../../../graphql/org'
// import { Input } from 'semantic-ui-react'
// import { Div } from '../../styled/styled-semantic'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { useSpring, animated, useTransition } from 'react-spring'
import CollapsableSection from '../../presentational/CollapsableSection'
import { Icon, Div } from '../../styled/styled-semantic'
import LeftIcon from '../../Details/Menu/LeftIcon';

const MenuOverlay = styled(animated.div)`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: rgba(255,255,255,1);
`

export default ({
  notify,
  org,
  initiallyExpanded
}) => {
  const [ createMode, setCreateMode ] = useState(false)
  useEffect(() => undefined, [createMode])
  const transitions = useTransition(createMode, null, {
    from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 },
  })
  return <>
    <CollapsableSection
      initiallyExpanded={initiallyExpanded}
      // title='Договор'
      title={'Договор ' + createMode}
      buttons={<>
        <Icon link 
          // circular
          activeColor='green'
          name='plus'
          onClick={e => {
            e.stopPropagation()
            console.log('setCreateMode > ', setCreateMode) ||setCreateMode(true)
            notify({
              type: 'warning',
              content: 'Чтобы загрузить файлы, перетащите их в раздел',
            })
          }}
          // loading={creating}
        />
      </>}
    >
      {transitions.map(({ item, key, props }) => 
        item && 
          <MenuOverlay
            key={key}
            style={props}
          >
            <LeftIcon
              size='large'
              name='cancel'
              onClick={() => setCreateMode(false)}
            />
            <Div
              fs='1.1em'
              c='rgba(0,0,0,.75)'
              fw='700'
            >
              Создание договора
            </Div>
            {/* <Icon
              name='download'
              size='large'
              c='black'
              onClick={() => setCreateMode(false)}
            /> */}
          </MenuOverlay>
      )}
        
      <div>ldskfjlkj</div>
    </CollapsableSection>
    {/* <Mutation
      mutation={mergeOrg}
      variables={{ id }}
      onCompleted={() => {
        // refetchPersons()
        notify({
          type: 'success',
          title: 'ИНН присвоен'
        })
      }}
      onError={err => notify({
        type: 'error',
        title: 'Ошибка присвоения ИНН',
        content: err.message,
      })}
    >
      {( mergeOrg, { loading } ) =>
        <Div
          p='1em 1em 1em 55px'
        >
          <Input
            value={val}
            onChange={(e, { value }) => setVal(value)}
            placeholder='ИНН'
            onBlur={() => mergeOrg({ variables: { id, inn: val } })}
            loading={loading}
          />
        </Div>
      }
    </Mutation> */}
  </>
}