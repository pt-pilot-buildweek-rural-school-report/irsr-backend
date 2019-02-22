const express = require('express')
const db = require('../dbConfig')
const router = express.Router()

router.get('/', (req, res) => {
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
			res.json(issues)
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'Cannot retrieve information about these issues.' })
		})
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	db('issues')
		.where({ id })
		.then(issues => {
			res.json(issues)
		})
		.catch(() => {
			res.status(500).json({
				error: 'Could not find the issue in the database.'
			})
		})
})

router.post('/', (req, res) => {
	const issue = req.body
	if (issue.issue_name && issue.issue_type && issue.comments) {
		db('users')
			.where({ id: issue.user_id })
			.first()
			.then(user => {
				if (!user) {
					res.status(404).json({ error: 'invalid user id' })
				} else {
					db('issues')
						.insert(issue)
						.then(id => {
							res.status(201).json({ id: id[0], ...issue })
						})
						.catch(() => {
							res
								.status(500)
								.json({ error: 'Failed to insert the issue into the database' })
						})
				}
			})
	} else {
		res.status(400).json({ error: 'Please provide all required fields' })
	}
})

router.put('/:id', (req, res) => {
	const { id } = req.params
	const issue = req.body
	db('issues')
		.where({ id })
		.update(issue)
		.then(issue => {
			res.status(200).json(issue)
		})
		.catch(() => {
			res
				.status(500)
				.json({ error: 'Failed to update information about this issue.' })
		})
})

router.delete('/:id', (req, res) => {
	const { id } = req.params
	db('issues')
		.where({ id })
		.del()
		.then(issue => {
			if (issue) {
				res.json({
					message: 'The issue was successfully deleted from the database.'
				})
			} else {
				res.status(404).json({
					error:
						'The issue with the specified id does not exist in the database.'
				})
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The issue could not be removed from the database.' })
		})
})

module.exports = router
