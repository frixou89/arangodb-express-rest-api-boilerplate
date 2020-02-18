const express = require('express')
const app = express()
const helmet = require('helmet')
// Routers
const userRoutes = require('../routes/userRoutes')
const authRoutes = require('../routes/authRoutes')

app.use(express.json())

// Security
app.disable('x-powered-by')
app.use(helmet())

// Routes
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

module.exports = app
