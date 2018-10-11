import { compose, graphql } from 'react-apollo'
import { prodsLocal } from '../../graphql/prod'

const ProdDataProvider = ({
	children,
	prodsLocal: { prodsLocal }
}) => {
  return children({
		prodsLocal: prodsLocal || [],
	})
}

export default compose(
	graphql(prodsLocal, { name: 'prodsLocal' }),
)(ProdDataProvider)
