
const express = require('express')
const db = require('../dbConfig')
const router = express.Router()

// router.get('/api/schools', (req, res) => {
//     db('schools')
//       .then(schools => {
//         res.json(school)
//       })
//       .catch(() => {
//         res.status(500).json({ error: 'Information about the schools cannot be retrieved.' })
//       })
//   })


module.exports = router