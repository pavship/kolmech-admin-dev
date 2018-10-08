import gql from 'graphql-tag'

export const getLayout = gql`
	query getLayout {
		layout @client {
			details
		}
	}
`

export const getLayoutOptions = ({
	props: ({ data: { layout } }) => ({
	  	layout
	})
})

export const setLayout = gql`
	mutation SetLayout($layout: json) {
		setLayout(layout: $layout) @client {
			result
		}
	}
`

export const setExpanded = gql`
	mutation SetExpanded($args: json) {
		setExpanded(args: $args) @client {
			args
		}
	}
`