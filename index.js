require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mwConfig = require('./data/mwConfig')
const db = require('./data/dbConfig.js')

const PORT = process.env.PORT || 5000
const server = express()
server.use(express.json())

mwConfig(server)

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
		expiresIn: '48hr'
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

function authenticate(req, res, next) {
	const token = req.headers.authorization
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'invalid token' })
			} else {
				req.decodedToken = decodedToken
				next()
			}
		})
	} else {
		res.status(401).json({ message: 'no token provided' })
	}
}

//USERS ENDPOINTS
server.get('/api/users', authenticate,(req, res) => {
	db('users')
		.select('id', 'username') 
		.then(users => {
			res.json({ users, decodedToken: req.decodedToken })
		})
		.catch(() => {
			res.status(500).json({ message: 'You shall not pass!' })
		})
})

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params
	db('users')
	.where({ id })
	  .then(users => {
		res.json(users)
	  })
	  .catch(() => {
		res.status(500).json({
		  error: 'Could not find the user in the database.'
		})
	  })
  })

  server.put('/api/users/:id', (req, res) => {
	const { id } = req.params
	const user = req.body
	db('users')
	.where({ id })
	  .update(user)
	  .then(rowCount => {
		res.status(200).json(rowCount)
	  })
	  .catch(() => {
		res
		  .status(500)
		  .json({ error: 'Failed to update information about this user.' })
	  })
  })

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params
	db('users')
	  .where({ id })
	  .del() 
	  .then(count => {
		if (count) {
		  res.json({
			message: 'The user was successfully deleted from the database.'
		  })
		} else {
		  res.status(404).json({
			error:
			  'The user with the specified id does not exist in the database.'
		  })
		}
	  })
	  .catch(err => {
		res
		  .status(500)
		  .json({ error: 'The user could not be removed from the database.' })
	  })
  })

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
