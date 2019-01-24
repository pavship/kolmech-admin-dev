import React from 'react'
// import { Message } from 'semantic-ui-react'
import { Message } from '../styled/styled-semantic'


export default ({
	message: { type, title, content }
}) => {
	console.log('type > ', type)
  return (
		<Message
			m='0 0 2rem 2rem'
			minw='350px'
			compact
			size='large'
			header={title}
			content={content}
			error={type === 'error'}
			info={type === 'info'}
			success={type === 'success'}
			warning={type === 'warning'}
		/>
	)
}