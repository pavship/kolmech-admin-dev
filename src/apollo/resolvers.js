import { getLayout } from '../graphql/layout'
import { allEnquiries } from '../graphql/enquiry'

const resolvers = {
	Enquiry: {
		isExpanded: () => false
	},
	Mutation: {
		setLayout: (_, input, { cache }) => {
			const query = getLayout
			const data = cache.readQuery({ query })
			data.layout = {
				...data.layout,
				...input
			}
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
	}
}

export default resolvers