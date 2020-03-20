const BaseModel = require('./base.model')

class UserModel extends BaseModel {
	constructor(props) {
		super()
		this.username = props.username
		this.password = props.password
		this.email = props.email
	}

	get collectionName() {
		return 'User'
	}
}

module.exports = {
	UserModel
}
