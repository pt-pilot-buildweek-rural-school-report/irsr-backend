import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Login from './Login'
import Users from './Users'


class App extends Component {
	render() {
		return (
            <div>
            <Login />
				<header>
					<nav>
						<NavLink to='/api/login'>LogIn</NavLink>
					</nav>
				</header>
				<main>
					<Route path='/api/login' component={Login} />
				</main>
			</div>
		)
    }
}

export default App