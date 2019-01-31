import React, { Component } from 'react'
import { cloneDeep } from 'apollo-utilities'

import { Mutation } from 'react-apollo'
import { createDrawings, deleteDrawings, setDrawingsSortOrder } from '../../../graphql/drawing'

import { Subscribe } from 'unstated'
import NotificationsProvider from '../../notifications/NotificationsProvider'
import SelectableListProvider from '../../special/SelectableListProvider'
import ToggleableBoolProvider from '../../special/ToggleableBoolProvider'

import Dropzone from 'react-dropzone'

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { Icon, Button, Span } from '../../styled/styled-semantic'
import CollapsableSection from '../../CollapsableSection'
import SortableDrawings from './SortableDrawings'
import { Loader } from 'semantic-ui-react';

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
  z-index: 2;
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

const MenuLeftIcon = styled(Icon)`
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
  state = {
    sortedDrawings: this.props.model.drawings && this.props.model.drawings.sort((a, b) => a.sortOrder < b.sortOrder ? -1 : 1)
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ sortedDrawings }) => {
      const list = cloneDeep(sortedDrawings)
      const [ removed ] = list.splice(oldIndex, 1)
      list.splice(newIndex, 0, removed)
      return { sortedDrawings: list }
    })
  }
  toggleableBool = new ToggleableBoolProvider()
  render() {
    const { model, sidebarRef } = this.props
    const { id: modelId, drawings } = model
    const { sortedDrawings } = this.state
    const selectableList = new SelectableListProvider()
    return (
      <Subscribe
        to={[
          NotificationsProvider,
          selectableList,
          this.toggleableBool
        ]}
      >
        {( notifications,
          {
            state: { list: selectedDrawings },
            select: selectDrawing,
            deselectAll: deselectAllDrawings,
            deselectMany: deselectManyDrawings
          },
          {
            state: { bool: sortMode },
            enable: enableSortMode,
            disable: disableSortMode,
          }
        ) =>
          <Mutation
            mutation={createDrawings}
            onCompleted={() => notifications.create({
              type: 'success',
              title: 'Файлы успешно загружены'
            })}
            onError={err => notifications.create({
              type: 'error',
              title: 'Ошибка загрузки файлов',
              content: err.message,
            })}
          >
            {(createDrawings, { loading: creating, client }) =>
              <Mutation
                mutation={deleteDrawings}
                onCompleted={() => notifications.create({
                  type: 'success',
                  title: 'Файлы удалены'
                })}
                onError={err => notifications.create({
                  type: 'error',
                  title: 'Ошибка удаления файлов',
                  content: err.message,
                })}
              >
                {(deleteDrawings, { loading: deleting }) =>
                  <Mutation
                    mutation={setDrawingsSortOrder}
                  >
                    {(setDrawingsSortOrder, { loading: sorting }) =>
                      <Dropzone
                        onDrop={async (acceptedFiles) => {
                          if (!acceptedFiles.length) return
                          const res = await createDrawings({
                            variables: {
                              modelId,
                              files: acceptedFiles
                            }
                          })
                          if (!res) return
                          const { data } = res
                          client.writeData({
                            id: `Model:${modelId}`,
                            data: {
                              ...model,
                              drawings: [
                                ...drawings,
                                ...data.createDrawings
                              ]
                            }
                          })
                          this.collapsableSection.expand()
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
                          open: openFileDialog,
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
                                  <MenuLeftIcon
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
                                    Выбрано чертежей: {selectedDrawings.length}
                                  </Span>
                                  <TrashIcon
                                    link
                                    m='0 23px 0 auto'
                                    name='trash alternate outline'
                                    size='large'
                                    onClick={async () => {
                                      const ids = selectedDrawings
                                      const res = await deleteDrawings({ variables: { ids }})
                                      if (!res) return
                                      client.writeData({
                                        id: `Model:${modelId}`,
                                        data: {
                                          ...model,
                                          drawings: [ ...drawings.filter(drw => !ids.includes(drw.id)) ]
                                        }
                                      })
                                      deselectManyDrawings(ids)
                                    }}
                                  />
                                </MenuOverlay>
                              }
                              {sortMode &&
                                <MenuOverlay key='3' >
                                  <MenuLeftIcon
                                    link
                                    name='check'
                                    size='large'
                                    c='#016936'
                                    onClick={async () => {
                                      await setDrawingsSortOrder({ variables: {
                                        ids: sortedDrawings.map(drw => drw.id)
                                      }})
                                      sortedDrawings.forEach((drw, i) => {
                                        client.writeData({
                                          id: `Drawing:${drw.id}`,
                                          data: {
                                            ...drw,
                                            sortOrder: i
                                          }
                                        })
                                      })
                                      disableSortMode()
                                    }}
                                  />
                                  <Span
                                    fs='1.1em'
                                    c='rgba(0,0,0,.75)'
                                    fw='700'
                                  >
                                    Сортировка
                                  </Span>
                                  <Span
                                    ml='auto'
                                  >
                                    <Loader
                                      inline
                                      active={sorting}
                                    />
                                  </Span>
                                </MenuOverlay>
                              }
                            </PoseGroup>
                            <CollapsableSection
                              ref={component => this.collapsableSection = component}
                              initiallyExpanded={!!drawings.length}
                              disabled={!drawings.length}
                              title='Чертеж '
                              subtitle={
                                <Span
                                  fs='1.2em'
                                >
                                  <Icon
                                    name='file image outline'
                                    mr='4px'
                                  />
                                  {drawings.length}
                                </Span>
                              }
                              buttons={<>
                                <Button compact circular menu
                                  activeColor='green'
                                  icon='plus'
                                  onClick={e => {
                                    e.stopPropagation()
                                    notifications.create({
                                      type: 'warning',
                                      content: 'Чтобы загрузить файлы, перетащите их в раздел',
                                    })
                                    openFileDialog()
                                  }}
                                  loading={creating}
                                />
                                <Button compact circular menu
                                  icon='sort'
                                  onClick={e => {
                                    e.stopPropagation()
                                    notifications.create({
                                      type: 'warning',
                                      content: 'Чтобы изменить порядок, выберите и перетащите нужные чертежи',
                                    })
                                    enableSortMode()
                                  }}
                                />
                              </>}
                            >
                              <SortableDrawings
                                sortedDrawings={sortedDrawings}
                                selectDrawing={selectDrawing}
                                selectedDrawings={selectedDrawings}
                                sortMode={sortMode}
                                onSortEnd={this.onSortEnd}
                                getContainer={() => sidebarRef}
                              />
                            </CollapsableSection>
                          </DropzoneArea>
                        }
                      </Dropzone>
                    }
                  </Mutation>
                }
              </Mutation>
            }
          </Mutation>
        }
      </Subscribe>
    )
  }
}
