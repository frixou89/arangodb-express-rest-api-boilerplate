const arangojs = require('arangojs')
const assert = require('assert')
let _db

function initDb (callback) {
	if (_db) {
		console.warn('Trying to init DB again!')
		return callback(null, _db)
	}
	const Database = new arangojs.Database()
	Database.useDatabase(process.env.DB_NAME)
	Database.useBasicAuth(process.env.DB_USERNAME, process.env.DB_PASSWORD)

	if (!Database) {
		return callback()
	}
	_db = Database
	return callback(null, _db)
}

function getDb () {
	assert.ok(_db, 'Db has not been initialized. Please called init first.')
	return _db
}

module.exports = {
	getDb,
	initDb
}
