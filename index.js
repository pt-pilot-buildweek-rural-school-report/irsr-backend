const express = require('express')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const mwConfig = require('./data/mwConfig')
const db = require('./data/dbConfig.js')

const PORT = 3000
const server = express()
server.use(express.json())

mwConfig(server)

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})