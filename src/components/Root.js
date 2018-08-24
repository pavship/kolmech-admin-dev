import React, { Component, Fragment } from 'react'
import { AUTH_TOKEN } from '../constants'

import { isTokenExpired } from '../utils/jwtHelper'

import LoginPage from './LoginPage'
import EnquiriesPage from './EnquiriesPage'

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
				  :	<EnquiriesPage refreshToken={this.refreshToken} /> }
			</Fragment>
		)
	}
}

export default Root
