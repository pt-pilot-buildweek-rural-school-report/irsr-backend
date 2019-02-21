require('dotenv').config()
const express = require('express')
const userRoutes = require('./data/routes/userRoutes')
// const schoolRoutes = require('../irsr-backend/data/routes/schoolRoutes')
// const loginRoutes = require('./data/routes/loginRoutes')
const issueRoutes = require('./data/routes/issueRoutes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mwConfig = require('./data/mwConfig')
const db = require('./data/dbConfig.js')

const PORT = process.env.PORT || 5000
const server = express()
server.use(express.json())

mwConfig(server)

const {
	authenticate,
	generateToken,
	checkRole
} = require('./data/auth/authenticate')

// server.use('/api/schools', schoolRoutes)
server.use('/api/users', userRoutes)
server.use('/api/issues', issueRoutes)

//AUTH ENDPOINTS

server.post('/api/register', (req, res) => {
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
				res.status(201).json({ id: id[0] })
			})
			.catch(() => {
				res.status(500).json({ error: 'Unable to register user.' })
			})
	}
})

server.post('/api/login', (req, res) => {
	const creds = req.body
	db('users')
		.where({ username: creds.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user)
				res.status(200).json({
					message: `${user.username} is logged in`,
					token,
					id: user.id
				})
			} else {
				res.status(401).json({ message: 'You shall not pass!' })
			}
		})
		.catch(() =>
			res.status(500).json({ message: 'Please try logging in again.' })
		)
})

//SCHOOL ENPOINTS
server.get('/api/schools', (req, res) => {
	db('schools')
		.select('school_name', 'country', 'city', 'address')
		.then(schools => {
			res.json(schools)
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'Could not retrieve information about these schools' })
		})
})

server.get('/api/schools/:id', (req, res) => {
	const { id } = req.params
	db('schools')
		.where('schools.id', id)
		.then(school => {
			const thisSchool = school[0]
			db('issues')
				.select()
				.where('issues.school_id', id)
				.then(issues => {
					if (!thisSchool) {
						res.status(404).json({ err: 'invalid school id' })
					} else {
						res.json({
							id: thisSchool.id,
							name: thisSchool.school_name,
							country: thisSchool.country,
							city: thisSchool.city,
							issues: issues
						})
					}
				})
		})
		.catch(() => {
			res
				.status(404)
				.json({ error: 'Info about this school could not be retrieved.' })
		})
})

server.post('/api/schools', (req, res) => {
	const school = req.body
	if (school.school_name && school.country && school.city && school.address) {
		db('schools')
			.insert(school)
			.then(ids => {
				res.status(201).json(ids)
			})
			.catch(() => {
				res
					.status(500)
					.json({ error: 'Failed to insert the school into the database' })
			})
	} else {
		res
			.status(400)
			.json({ error: 'Please provide a name and full address for the school' })
	}
})

server.put('/api/schools/:id', (req, res) => {
	const { id } = req.params
	const school = req.body
	db('schools')
		.where({ id })
		.update(school)
		.then(school => {
			res.status(200).json(school)
		})
		.catch(() => {
			res
				.status(500)
				.json({ error: 'Failed to update information about this school.' })
		})
})

server.delete('/api/schools/:id', (req, res) => {
	const { id } = req.params
	db('schools')
		.where({ id })
		.del()
		.then(count => {
			if (count) {
				res.json({
					message: 'The school was successfully deleted from the database.'
				})
			} else {
				res.status(404).json({
					error:
						'The school with the specified id does not exist in the database.'
				})
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The school could not be removed from the database.' })
		})
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
