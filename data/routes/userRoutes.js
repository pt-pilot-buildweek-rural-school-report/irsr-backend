require('dotenv').config()
const express = require('express')
const db = require('../dbConfig')
const router = express.Router()

const { authenticate } = require('../auth/authenticate')

router.get('/api/users', authenticate, (req, res) => {
	db('users')
		.select('id', 'username')
		.then(users => {
			res.json({ users, decodedToken: req.decodedToken })
		})
		.catch(() => {
			res.status(500).json({ message: 'You shall not pass!' })
		})
})

router.get('/api/users/:id', (req, res) => {
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

router.put('/api/users/:id', (req, res) => {
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

router.delete('/api/users/:id', (req, res) => {
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

module.exports = router
