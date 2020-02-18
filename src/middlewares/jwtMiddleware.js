let jwt = require('jsonwebtoken')
const env = require('../config')

let checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Token not found'
		})
	}
	if (token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length)
	}

	if (token) {
		jwt.verify(token, env.jwtSecret, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: 'Token is not valid'
				})
			} else {
				req.decoded = decoded
				next()
			}
		})
	} else {
		return res.status(401).json({
			success: false,
			message: 'Auth token is not supplied'
		})
	}
}

module.exports = {
	checkToken: checkToken
}
