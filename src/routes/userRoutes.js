const router = require('express').Router()
const validate = require('validate.js')
const UserModel = require('../models/UserModel')
const { checkDuplicate, createUser } = require('../resolvers/userResolver')

router.post('/create-account', async function (req, res) {
	// Validate Request
	const constraints = {
		username: {
			presence: true,
			format: {
				pattern: '[a-z0-9]+',
				flags: 'i',
				message: 'can only contain a-z and 0-9'
			}
		},
		password: {
			presence: true,
			length: {
				minimum: 6,
				tooShort: 'needs to have %{count} words or more'
			}
		},
		email: {
			presence: true,
			email: true
		}
	}
	const v = validate(req.body, constraints)
	if (v) return res.status(400).json(v)

	const user = new UserModel(req.body)
	await checkDuplicate(res, user)
	await createUser(res, user)
})

module.exports = router
