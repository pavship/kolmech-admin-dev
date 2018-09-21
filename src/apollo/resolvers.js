import { getLayout } from '../graphql/layout'

const resolvers = {
	Mutation: {
		setLayout: (_, { details }, { cache }) => {
			console.log('details > ', details)
			const query = getLayout
			const data = cache.readQuery({ query })
			console.log('data > ', data)
			data.layout.details = details
			console.log('data > ', data)
			cache.writeQuery({
				query,
				data
			})
			return null
		}
		// assignCurrentEnquiry: (_, { id }, { cache }) => {
		//     // console.log(id)
		//     cache.writeData({
		//         data: {
		//             currentEnquiry: {
		//                 __typename: 'CurrentEnquiry',
		//                 id,
		//                 dateLocal: new Date()
		//             }
		//         }
		//     })
		// },
		// updateAlteredEnquiry: (_, { key, value }, { cache }) => {
		//     console.log(key, value)
		// }
	}
}

export default resolvers