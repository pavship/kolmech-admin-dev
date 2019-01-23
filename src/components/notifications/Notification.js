import React from "react"
import { Message } from "semantic-ui-react";

export default ({
	message: { title }
}) => {
  return (
		<Message
			header={title}
		/>
	)
}