const resolvers = {
    Mutation: {
        updateEnquiry: (_, { key, value }, { cache }) => {
            console.log(key, value)
        }
    }
}

export default resolvers