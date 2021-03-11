const db = require('./db')
const val = require('../businessLayer/account-validator')
/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function (callback) {

	const query = `SELECT * FROM accounts ORDER BY email`
	const values = []

	db.query(query, values, function (error, accounts) {
		if (error) {
			callback(['databaseError'], null)
		} else {
			callback([], accounts)
		}
	})

}
exports.createAccount = function (account, callback) {

	errors = []
	const query = `INSERT INTO accounts (name, username, password) VALUES (?, ?, ?)`
	const values = [account.name, account.username, account.password]

	db.query(query, values, function(error, results){
		if(error){
			console.log(error)
			if(error.sqlMessage.includes("usernameUnique")){
				callback(['usernameTaken'], null)
			}else{
				callback(['internalError'], null)
			}
		}else{
			callback([], results.insertId)
		}
	})
}

/*
	Retrieves the account with the given username.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username.
*/
exports.getAccountByEmail = function (email, callback) {

	const query = `SELECT * FROM accounts WHERE email = ? LIMIT 1`
	const values = [username]

	db.query(query, values, function (error, accounts) {
		if (error) {
			callback(['databaseError'], null)
		} else {
			callback([], accounts[0])
		}
	})

}