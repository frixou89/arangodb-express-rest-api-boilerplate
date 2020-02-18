const { getDb } = require('../config/Database')

class BaseModel {
	// https://ilikekillnerds.com/2015/06/abstract-classes-in-javascript/
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError

	constructor () {
		if (this.constructor === BaseModel) {
			throw new TypeError('Abstract class "BaseModel" cannot be instantiated directly.')
		}

		if (this.collectionName === undefined) {
			throw new TypeError('Inherited Class must implement `collectionName()`')
		}

		if (this.collectionName === undefined) {
			throw new TypeError('<collectionName> must be provided')
		}
	}

	get collection () {
		const db = getDb()
		const collection = db.collection(this.collectionName)
		return collection
	}
}

module.exports = BaseModel
