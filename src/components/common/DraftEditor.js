import React from 'react'
import { Editor, EditorState, ContentState, RichUtils,
        getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import 'draft-js/dist/Draft.css'
import {stateToHTML} from 'draft-js-export-html'

class DraftEditor extends React.Component {
    state = {
        editorState: EditorState.createEmpty()
    }
    onChange = (editorState) => {
        this.setState({ editorState })
        if (editorState) this.props.setEditorHasText(editorState.getCurrentContent().hasText())
    }
    kolmechKeyBindingFn = (e) => {
        // catch Ctrl + Enter event
        if (e.keyCode === 13 && KeyBindingUtil.hasCommandModifier(e)) {
          return 'kolmech-enter'
        }
        return getDefaultKeyBinding(e)
    }
    handleKeyCommand = (command, editorState) => {
        // handle Ctrl + Enter command
        if (command === 'kolmech-enter') {
            this.props.createComment()
            return 'handled'
        }
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled'
        }
        return 'not-handled'
    }
    clear = () => this.setState({ 
        editorState: EditorState.push(this.state.editorState, ContentState.createFromText(''), 'remove-range')
    })
    exportHtml = () => stateToHTML(this.state.editorState.getCurrentContent())
    render() {
        return (
            <Editor 
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.kolmechKeyBindingFn}
                readOnly={this.props.readOnly} />
        )
    }
}

export default DraftEditor