import React from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import {stateToHTML} from 'draft-js-export-html'

class DraftEditor extends React.Component {
    state = {
        editorState: EditorState.createEmpty()
    }
    onChange = (editorState) => {
        this.setState({ editorState })
        if (editorState) this.props.setEditorHasText(editorState.getCurrentContent().hasText())
        // this.props.printOutRaw(convertToRaw(editorState.getCurrentContent()))
        // this.props.printOutHtml(convertToRaw(editorState.getCurrentContent()))
        // console.log(stateToHTML(editorState.getCurrentContent()))
    }
    clear = () => this.setState({ 
        editorState: EditorState.push(this.state.editorState, ContentState.createFromText(''), 'remove-range')
    })
    exportHtml = () => stateToHTML(this.state.editorState.getCurrentContent())
    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={this.onChange} readOnly={this.props.readOnly} />
        )
    }
}

export default DraftEditor