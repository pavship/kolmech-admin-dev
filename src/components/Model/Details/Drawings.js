import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import { createDrawings } from '../../../graphql/drawing'

import { Subscribe } from 'unstated';

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'

import Dropzone from 'react-dropzone'

import { Icon, Button, Span } from '../../styled/styled-semantic'
import CollapsableSection from '../../CollapsableSection'
import NotificationsProvider from '../../notifications/NotificationsProvider'
import Drawing from './Drawing';
import SelectableListProvider from '../../special/SelectableListProvider';

const DropzoneArea = styled.div`
  position: relative;
  :focus {
    outline: none;
  }
`

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

const MenuOverlay = styled(posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: absolute;
  z-index: 1;
  top: 1px;
  right: 0;
  left: 0;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: rgba(255,255,255,1);
`

const CancelIcon = styled(Icon)`
  &&& {
		box-sizing: content-box;
		width: calc(55px - 1em);
		margin: 0 0.5em;
	}
`

const TrashIcon = styled(Icon)`
  :hover {
    color: #db2828;
  }
`



export default class Drawings extends Component {
  render() {
    const {
      modelId,
      drawings
    } = this.props
    return (
      <Subscribe
        to={[NotificationsProvider, SelectableListProvider]}
      >
        {(
          notifications,
          {
            state: { list: selectedDrawings },
            select: selectDrawing,
            deselectAll: deselectAllDrawings
          }) =>
          <Mutation
            mutation={createDrawings}
            onError={err => notifications.create({
              type: 'error',
              title: 'Ошибка загрузки файлов',
              content: err.message,
            })}
          >
            {(createDrawings, { loading, error }) => 
              <Dropzone
                onDrop={async (acceptedFiles) => {
                  if (!acceptedFiles.length) return
                  const res = await createDrawings({
                    variables: {
                      modelId,
                      files: acceptedFiles
                    }
                  })
                  console.log('res > ', res)
                }}
                disableClick
                accept='image/jpeg, image/png'
                onDropRejected={() => notifications.create({
                  type: 'error',
                  title: 'Недопустимый формат файла',
                  content: 'Поддерживаются только изображения .jpeg или .png',
                })}
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
                      {selectedDrawings.length &&
                        <MenuOverlay key='2' >
                          <CancelIcon
                            link
                            size='large'
                            name='cancel'
                            onClick={() => deselectAllDrawings()}
                          />
                          <Span
                            fs='1.1em'
                            c='rgba(0,0,0,.75)'
                            fw='700'
                          >
                            Выбрано чертежей: {drawings.length}
                          </Span>
                          <TrashIcon
                            link
                            m='0 23px 0 auto'
                            name='trash alternate outline'
                            size='large'
                          />
                        </MenuOverlay>
                      }
                    </PoseGroup>
                    <CollapsableSection
                      initiallyExpanded={!!drawings.length}
                      title='Чертеж '
                      subtitle={
                        <Span
                          // ml='10px'
                          fs='1.2em'
                        >
                          <Icon
                            name='file image outline'
                            mr='4px'
                          />
                          {drawings.length}
                        </Span>
                      }
                      buttons={
                        <Button compact circular menu
                          activeColor='green'
                          icon='plus'
                          active={ false }
                          onClick={e => {
                            e.stopPropagation()
                            notifications.create({
                              type: 'warning',
                              content: 'Чтобы загрузить файлы, перетащите их в раздел',
                            })
                            open()
                          }}
                          loading={loading}
                        />
                      }
                    >
                      {drawings.length &&
                        <Drawing
                          drawing={drawings[0]}
                          select={selectDrawing}
                          selected={!!selectedDrawings.includes(drawings[0].id)}
                        />
                      }
                    </CollapsableSection>
                  </DropzoneArea>
                }
              </Dropzone>
            }
          </Mutation>
        }
      </Subscribe>
    )
  }
}
