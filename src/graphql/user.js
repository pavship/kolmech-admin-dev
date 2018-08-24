import gql from 'graphql-tag'

export const me = gql`
	query Me {
		me {
			id
			email
			person {
				fName
				lName
			}
		}
	}
`

export const login = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				email
				person {
					fName
					lName
				}
			}
		}
	}
`