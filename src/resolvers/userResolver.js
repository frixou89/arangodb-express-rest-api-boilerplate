const { getDb } = require('../config/Database')
const { aql } = require('arangojs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.checkDuplicate = async function (res, user) {
	const db = getDb()
	const cursor = await db.query(aql`
    FOR u in User
      FILTER u.username == ${user.username} || u.email == ${user.email}
      return u
  `)
	const result = await cursor.next()
	if (result) {
		let reason = []
		if (result.username === user.username) {
			reason.push('duplicate_username')
		}
		if (result.email === user.email) {
			reason.push('duplicate_email')
		}
		return res
			.status(400)
			.json({ reason: reason })
			.end()
	}
}

module.exports.createUser = async function (res, user) {
	try {
		const db = getDb()
		const collection = db.collection(user.collectionName)
		await bcrypt.hash(user.password, 10, async function (err, hash) {
			user.password = hash
			await collection.save(user)
			delete user.password
			return res.status(200).json(user)
		})
	} catch (error) {
		let _errCode = 400
		if (error.code) {
			_errCode = error.code
		}
		return res.status(_errCode).end('Save Error')
	}
}

module.exports.getUserToken = async function (res, username, password) {
	const db = getDb()

	const cursor = await db.query(aql`
    FOR u in User
      FILTER u.username == ${username}
      return u
  `)
	const dbUser = await cursor.next()
	if (dbUser) {
		bcrypt.compare(password, dbUser.password, function (err, passCorrect) {
			if (err) {
				res.status(400).json('Password Decryption Failed')
			}
			if (passCorrect) {
				let token = jwt.sign({ userId: dbUser._key, username: dbUser.username }, process.env.JWT_SECRET, {
					expiresIn: '24h' // expires in 24 hours
				})
				res.json({
					success: true,
					message: 'Authentication successful!',
					token: token
				})
			}
		})
	}
}
