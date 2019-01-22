import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import { createDrawings } from '../../../graphql/drawing'


import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'

import CollapsableSection from '../../CollapsableSection'
import Dropzone from 'react-dropzone'
import { Icon, Button, Span } from '../../styled/styled-semantic';
import { Popup } from 'semantic-ui-react';

const DropzoneArea = styled.div`
  position: relative;
  :focus {
    outline: none;
  }
`

// const DropzoneOverlay = styled.div`
const DropzoneOverlay = styled(posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.65);
`

export default class Drawings extends Component {
  // handleDrop =  => {
  //   console.log(droppedFiles)
  // }
  render() {
    const {
      modelId,
      drawings
    } = this.props
    return (
      <Mutation
        mutation={createDrawings}
      >
        {(createDrawings, { loading, error }) => 
          <Dropzone
            onDrop={async (acceptedFiles, rejectedFiles) => {
              const res = await createDrawings({
                variables: {
                  modelId,
                  files: acceptedFiles
                }
              })
              console.log('res > ', res)
            }}
            disableClick
          >
            {({
              getRootProps,
              getInputProps,
              open,
              isDragActive,
            }) =>
              <DropzoneArea
                isDragActive={isDragActive}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PoseGroup>
                  {isDragActive &&
                    <DropzoneOverlay key='1'>
                      <Icon
                        name='download'
                        size='large'
                        c='white'
                      />
                    </DropzoneOverlay>
                  }
                </PoseGroup>
                <CollapsableSection
                  title='Чертеж '
                  subtitle={
                    <Span
                      ml='10px'
                      fs='1.2em'
                    >
                      <Icon
                        name='file outline'
                        mr='4px'
                      />
                      {drawings.length}
                    </Span>
                  }
                  buttons={
                    <Popup
                      position='bottom right'
                      size='small'
                      flowing
                      trigger={
                        <Button compact circular menu
                          activeColor='green'
                          icon='plus'
                          active={ false }
                          onClick={e => {
                            e.stopPropagation()
                            open()
                          }}
                        />
                      } 
                    >
                      <Popup.Content>
                        <Icon name='info circle' />
                        Можно также перетащить файлы в этот раздел
                      </Popup.Content>
                    </Popup>
                  }
                >
                  lkdfjlkfdgj
                </CollapsableSection>
              </DropzoneArea>
            }
          </Dropzone>
        }
      </Mutation>
    )
  }
}
