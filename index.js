const express = require('express')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const mwConfig = require('./data/mwConfig')
const db = require('./data/dbConfig.js')

const PORT = 3000
const server = express()
server.use(express.json())

mwConfig(server)

server.post('/api/register', (req, res) => {
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
})

const generateToken = user => {
	const payload = {
		username: user.username
	}
	const secret = process.env.JWT_SECRET

	const options = {
		expiresIn: '20m'
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
					.json({ message: `${user.username} is now logged in`, token })
			} else {
				res.status(401).json({ message: 'You are not authorized.' })
			}
		})
		.catch(() => {
			res.status(500).json({ messgae: 'Please try logging in again.' })
		})
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
