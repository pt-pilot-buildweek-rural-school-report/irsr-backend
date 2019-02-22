const express = require('express')
const helmet= require('helmet')
const logger = require('morgan')
const cors = require('cors')

const whitelist = ['http://localhost:3000', 'https://international-rural-school-report.netlify.com']

const corsOptions = {origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }};

module.exports = server => {
    server.use(express.json(),logger('tiny'),helmet(),cors(corsOptions))  
}