import React, { Component } from 'react'

import styled from 'styled-components'

import DraftEditor from './DraftEditor'

const EditorWrapper = styled.div`
	/* padding: .78571429em 1em; */
	/* TODO cool concept: borders appear only when editing
		margin-left: -15px;
		border: none; 
	*/
	/* padding: calc(0.678571em - 1px) 1em;
	margin: 0;
	border: 1px solid rgba(34,36,38,.15);
	border-radius: .28571429rem;
	transition: color .1s ease,border-color .1s ease;
	line-height: 1.4285em; */
	/* 2,785642 */
	
	/* margin: 0; */
	padding: calc(0.678571em - 1px) 1em;
	line-height: 1.4285em;
	border: 1px solid rgba(34,36,38,.15);
	border-radius: .28571429rem;
	transition: all .1s ease;
	${({ borderless, hasFocus, diff }) =>
		borderless
		&& !hasFocus
		&& !diff && `
			margin-left: -1em;
			border: 1px solid white;
			:hover {
				background: rgba(0,0,0,.05);
				color: rgba(0,0,0,.65);
				cursor: pointer;
			}
		`
	}
	/* ${props => props.borderless && `
		margin-left: -1em;
		:hover {
			background: rgba(0,0,0,.05);
			color: rgba(0,0,0,.65);
			cursor: pointer;
		}
	`} */
	/* ${props => props.withButton && 'margin-bottom: .67857143em'} */
`

class WrappedDraftEditor extends Component {
	state = {
		hasFocus: false
	}
	setHasFocus = (hasFocus) => {this.setState({ hasFocus }); console.log('hasFocus > ', hasFocus)}
	render() {
		const { hasFocus } = this.state
		const {
			borderless,
			diff,
			forwardedRef,
			...rest
		} = this.props
		return (
			<EditorWrapper
				borderless={borderless}
				hasFocus={hasFocus}
				diff={diff}
			>
				<DraftEditor
					ref={forwardedRef}
					setHasFocus={this.setHasFocus}
					{...rest}
				/>
				{/* <button onClick={() => console.log(forwardedRef.current.exportHtml())} /> */}
			</EditorWrapper>
		)
	}
}

export default React.forwardRef((props, ref) =>
	<WrappedDraftEditor
		forwardedRef={ref}
		{...props}
	/>
)