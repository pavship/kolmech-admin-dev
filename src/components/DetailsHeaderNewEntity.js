import React, { Component, Fragment } from 'react'

import { graphql, compose, ApolloConsumer, Query  } from 'react-apollo'
import { enquiryDetails, enquiryLocal } from '../graphql/enquiry'
import GlobalContext from './special/GlobalContext'

import { Header as SHeader, Icon } from 'semantic-ui-react'
import { Span } from './styled-semantic/styled-semantic'

import DetailsHeaderWrapper from './DetailsHeaderContainer'

import { entityTitles } from '../constants'

class DetailsHeaderNewEntity extends Component {
	render() {
		const { type, entityQuery: { refetch }, entityLocal } = this.props
		return (
				<SHeader.Content>
					{entityTitles[type].new}
				</SHeader.Content>
		)
	}
}

export default DetailsHeaderNewEntity
