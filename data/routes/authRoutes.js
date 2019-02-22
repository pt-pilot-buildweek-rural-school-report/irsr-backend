// const express = require('express')
// const db = require('../dbConfig')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const router = express.Router()

// const { authenticate, generateToken, checkRole } = require('../auth/authenticate')

// router.post('/register', (req, res) => {
// 	const user = req.body
// 	if (
// 		!user.username ||
// 		typeof user.username !== 'string' ||
// 		user.username === ''
// 	) {
// 		res.status(400).json({ message: 'Username must be a valued string.' })
// 	} else if (
// 		!user.password ||
// 		typeof user.password !== 'string' ||
// 		user.password === ''
// 	) {
// 		res.status(400).json({
// 			message: 'Password must be a valued string of 8 characters or more.'
// 		})
// 	} else {
// 		const creds = req.body
// 		const hash = bcrypt.hashSync(creds.password, 12)
// 		creds.password = hash
// 		db('users')
// 			.insert(creds)
// 			.then(id => {
// 				res.status(201).json({ id: id[0] })
// 			})
// 			.catch(() => {
// 				res.status(500).json({ error: 'Unable to register user.' })
// 			})
// 	}
// })

// router.post('/login', (req, res) => {
// 	const creds = req.body
// 	db('users')
// 		.where({ username: creds.username })
// 		.first()
// 		.then(user => {
// 			if (user && bcrypt.compareSync(creds.password, user.password)) {
// 				const token = generateToken(user)
// 				res.status(200).json({
// 					message: `${user.username} is logged in`,
// 					token,
// 					id: user.id
// 				})
// 			} else {
// 				res.status(401).json({ message: 'You shall not pass!' })
// 			}
// 		})
// 		.catch(() =>
// 			res.status(500).json({ message: 'Please try logging in again.' })
// 		)
// })

// module.exports = router => {
//     '/api/register', '/api/login'
// }