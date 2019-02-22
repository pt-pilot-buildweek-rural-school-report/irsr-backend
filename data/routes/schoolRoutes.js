// require('dotenv').config()
const express = require('express')
const db = require('../dbConfig')
const router = express.Router()

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router
