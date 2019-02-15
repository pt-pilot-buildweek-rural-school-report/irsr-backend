require('dotenv').config()
const express = require('express')
const userRoutes = require('./data/routes/userRoutes')
// const loginRoutes = require('./data/routes/loginRoutes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mwConfig = require('./data/mwConfig')
const db = require('./data/dbConfig.js')

const PORT = process.env.PORT || 5000
const server = express()
server.use(express.json())

mwConfig(server)

server.use('/api/users', userRoutes)

server.post('/api/register', (req, res) => {
	// typeof user.is_admin === 'boolean' &&
	// typeof user.is_board_member === 'boolean'
	const user = req.body
	if (
		!user.username ||
		typeof user.username !== 'string' ||
		user.username === ''
	) {
		res.status(400).json({ message: 'Username must be a valued string.' })
	} else if (
		!user.password ||
		typeof user.password !== 'string' ||
		user.password === ''
	) {
		res.status(400).json({
			message: 'Password must be a valued string of 8 characters or more.'
		})
	} else {
		const creds = req.body
		const hash = bcrypt.hashSync(creds.password, 12)
		creds.password = hash
		db('users')
			.insert(creds)
			.then(id => {
				res.status(201).json(id)
			})
			.catch(() => {
				res.status(500).json({ error: 'Unable to register user.' })
			})
	}
})

function generateToken(user) {
	const payload = {
		username: user.username,
		userId: user.id,
		roles: ['user.is_admin', 'user.is_board_member',] //example: should come from database user.roles
	}

	const secret = process.env.JWT_SECRET

	const options = {
		expiresIn: '45m'
	}
	return jwt.sign(payload, secret, options)
}

server.post('/api/login', (req, res) => {
	const creds = req.body
	db('users')
		.where({ username: creds.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user)
				res
					.status(200)
					.json({ message: `${user.username} is logged in`, token })
			} else {
				res.status(401).json({ message: 'You shall not pass!' })
			}
		})
		.catch(() =>
			res.status(500).json({ message: 'Please try logging in again.' })
		)
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
