import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
  constructor() {
    super()
	this.state = {
		username: '',
		password: ''
  }
}

	async componentDidMount() {
		const endpoint = `${process.env.REACT_APP_API_URL}/api/users`
		try {
			const response = await axios.get(endpoint)
			this.setState({ users: response.data.users })
		} catch (error) {
			console.error('we ran into an issue getting the users')
		}
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<input
						name='username'
						value={this.state.username}
						placeholder='username'
						onChange={this.handleInputChange}
						type='text'
					/>
				</div>
				<div>
					<input
						name='username'
						value={this.state.password}
						placeholder='password'
						onChange={this.handleInputChange}
						type='password'
					/>
				</div>
				<div>
					<button type='submit'>Login</button>
				</div>
			</form>
		)
	}

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = e => {
        e.preventDefault()

        const endpoint = `${process.env.REACT_APP_API_URL}/api/login`
        axios
            .post(endpoint, this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token)
            })
            .catch(err => console.error(err))
    }
}

export default Login
