const router = require('express').Router()
const validate = require('validate.js')
const { getUserToken } = require('../resolvers/userResolver')

router.post('/login', async function (req, res) {
	// Validate Request
	const constraints = {
		username: {
			presence: true
		},
		password: {
			presence: true
		}
	}

	const v = validate(req.body, constraints)
	if (v) return res.status(400).json(v)

	let username = req.body.username
	let password = req.body.password

	await getUserToken(res, username, password)
})

module.exports = router
