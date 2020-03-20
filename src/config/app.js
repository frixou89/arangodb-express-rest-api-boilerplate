const express = require('express')
const app = express()
const helmet = require('helmet')
// Routes
const { AuthController, UserController } = require('../controllers')

app.use(express.json())

// Security
app.disable('x-powered-by')
app.use(helmet())

// Routes
app.use('/auth', AuthController)
app.use('/user', UserController)

module.exports = app
