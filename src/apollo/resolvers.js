import { getLayout } from '../graphql/layout'
import { allEnquiries } from '../graphql/enquiry'

const resolvers = {
	Enquiry: {
		isExpanded: () => false
	},
	Mutation: {
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