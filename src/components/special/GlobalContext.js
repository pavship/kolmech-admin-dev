import React, { Fragment } from 'react'

import { compose, graphql } from 'react-apollo'

import { getLayout, getLayoutOptions, setLayout, setExpanded } from '../../graphql/layout'

// const GlobalContext = React.createContext()

// class GlobalContextProvider extends Component {
// 	// setDetails = (details) => {
// 	// 	this.props.setLayout({variables: { details }})
// 	// }
// 	render() {
// 		const { children, getLayout: { details }, setLayout } = this.props
// 		return (
// 			<GlobalContext.Provider 
// 				value={{
// 					details,
// 					setDetails: (details) => setLayout({variables: { details }})
// 				}}
// 			>
// 				{children}
// 			</GlobalContext.Provider>
// 		)
// 	}
// }

const GlobalContext = ({ children, layout, setLayout, setExpanded }) => {
	const { details, extra } = layout
  return children({
		details,
		extra,
		setDetails: (details) => setLayout({variables: { layout: { ...layout, details } }}),
		setExtra: (extra) => setLayout({variables: { layout: { ...layout, extra } }}),
		setExpanded: (args) => setExpanded({variables: { args }}),
	})
}

export default compose(
	graphql(getLayout, getLayoutOptions),
	graphql(setLayout, { name: 'setLayout' }),
	graphql(setExpanded, { name: 'setExpanded' }),
)(GlobalContext)
	
// export default GlobalContextProvider
// export const GlobalContextConsumer = GlobalContext.Consumer