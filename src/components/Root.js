import React, { Component, Fragment } from 'react'
import { AUTH_TOKEN } from '../constants'

import { isTokenExpired } from '../utils/jwtHelper'

import LoginPage from './LoginPage'
import EnquiriesPage from './EnquiriesPage'

import { Query } from 'react-apollo'
import { me } from '../graphql/user'

class Root extends Component {
	state = {
		token: this.props.token
	}
	 //verify localStorage check
	componentDidMount() {
		this.bootStrapData()
	}
	bootStrapData = () => {
		try {
			const token = localStorage.getItem(AUTH_TOKEN)
			if (token !== null && token !== undefined) {
				const expired = isTokenExpired(token)
				if (!expired) {
					this.setState({ token: token })
				} else {
					localStorage.removeItem(AUTH_TOKEN)
					this.setState({ token: null })
				}
			}
		} catch (e) {
			// maybe TODO - provide fatal error message
		 	 console.log('')
		}
	}
	refreshToken = (token) => {
		if (token) {
		  	localStorage.setItem(AUTH_TOKEN, token)
		} else {
		  	localStorage.removeItem(AUTH_TOKEN)
		}
		this.setState({ token })
	}
	render() {
		const { token } = this.state
		console.log('token on startup > ', token)
		return (
			<Fragment>
				{ !token 
				  ?	<LoginPage refreshToken={this.refreshToken} />
				  : <Query
                        query={me}
                         >
                        { ({ loading, error, data }) => (
                            <Fragment>
                                { loading && 'Загрузка...'}
                                { error   && `Ошибка ${error.message}`}
                                <EnquiriesPage refreshToken={this.refreshToken} me={data.me} />
                            </Fragment>
                        )}
                    </Query> }
			</Fragment>
		)
	}
}

export default Root
