class ResH {
	static getError (res, errorCode) {
		// https://www.arangodb.com/docs/3.6/http/document-working-with-documents.html#create-document
		console.log('Error Code: ' + errorCode)
		return {
			success: false,
			error: this.getErrorMessage(errorCode)
		}
	}

	static saveSuccess (data) {
		return {
			success: true,
			data: data
		}
	}

	static getErrorMessage (errorCode) {
		if (typeof errorMessageMap[errorCode] === 'undefined') {
			return errorMessageMap['default']
		}

		return errorMessageMap[errorCode]
	}
}

const errorMessageMap = {
	default: 'error',
	409: 'unique_constraint'
}

module.exports = ResH
