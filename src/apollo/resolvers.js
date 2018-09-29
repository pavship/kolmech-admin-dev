import { getLayout } from '../graphql/layout'
import { allEnquiries } from '../graphql/enquiry'
import { delay } from '../utils/promises'

const resolvers = {
	Enquiry: {
		isExpanded: () => false
	},
	Mutation: {
		// setLayout: async(_, { details }, { cache }) => {
		// 	const query = getLayout
		// 	const data = cache.readQuery({ query })
		// 	// if null > notify DetailsSidebar to start closing 2. Delay while animating out
		// 	if (details === null) {
		// 		data.layout.details = {
		// 			...data.layout.details,
		// 			closing: true
		// 		}
		// 		cache.writeQuery({ query, data })
		// 	}
		// 	data.layout.details = details
		// 	// if null > delay while animating out
		// 	if (details === null) await delay(500)
		// 	cache.writeQuery({ query, data })
		// 	return null
		// },
		setLayout: (_, { details }, { cache }) => {
			const query = getLayout
			const data = cache.readQuery({ query })
			data.layout.details = details
			cache.writeQuery({ query, data })
			return null
		},
		setExpanded: (_, { args: { id: enquiryId, value } }, { cache }) => {
			const query = allEnquiries
			const data = cache.readQuery({ query })
			const enquiry = data.enquiries.find(e => e.id === enquiryId)
			enquiry.isExpanded = value
			cache.writeQuery({ query, data })
			return null
		}
		// updateAlteredEnquiry: (_, { key, value }, { cache }) => {
		//     console.log(key, value)
		// }
	}
}

export default resolvers