require('dotenv').config()
const { app } = require('./config')
const port = process.env.PORT || 9000
const { initDb } = require('./config/Database')

// eslint-disable-next-line no-unused-vars
initDb(function (err) {
	app.listen(port, function (err) {
		if (err) {
			throw err
		}
		console.log(`Server started at http://localhost:${port}`)
	})
})
