import React from 'react'
import { Message } from '../styled/styled-semantic'

export default ({
	message: { id, type, title, content },
	dismissNotification
}) => {
  return (
		<Message
			m='0 0 2rem 2rem'
			minw='350px'
			pe='all'
			compact
			size='large'
			header={title}
			content={content}
			error={type === 'error'}
			info={type === 'info'}
			success={type === 'success'}
			warning={type === 'warning'}
			onDismiss={() => dismissNotification(id)}
		/>
	)
}