require('dotenv').config()
const express = require('express')
const db = require('../dbConfig')
const router = express.Router()

const { authenticate, checkRole } = require('../auth/authenticate')

router.get('/', authenticate, (req, res) => {
	db('users')
		.select('id', 'username')
		.then(users => {
			res.json({ users, decodedToken: req.decodedToken })
		})
		.catch(() => {
			res.status(500).json({ message: 'You shall not pass!' })
		})
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	db('users')
		.where('users.id', id)
		.then(user => {
			const thisUser = user[0]
			db('issues')
				.join('users', 'issues.user_id', '=', 'users.id')
				.join('schools', 'issues.school_id', '=', 'schools.id')
				.select(
					'issues.id',
					'issues.issue_name',
					'issues.issue_type',
					'issues.created_at',
					'issues.is_resolved',
					'issues.date_resolved',
					'issues.resolved_by',
					'issues.is_scheduled',
					'issues.ignored',
					'issues.comments',
					'schools.school_name',
					'users.username'
				)
				.then(issues => {
					if (!thisUser) {
						res.status(404).json({ err: 'invalid user id' })
					} else {
						res.json({
							id: thisUser.id,
							name: thisUser.username,
							role: thisUser.role,
							password: thisUser.password,
							school_id: thisUser.school_id,
							issues: issues
						})
					}
				})
		})
		.catch(() => {
			res
				.status(404)
				.json({ error: 'Info about this user could not be retrieved.' })
		})
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
