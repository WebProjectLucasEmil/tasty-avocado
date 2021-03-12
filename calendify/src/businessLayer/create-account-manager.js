const createAccountRepository = require('../dataAccessLayer/create-account-repository')
const accountValidator = require('./account-validator')

exports.createAccount = function(account, callback){
	
	// Validate the account.
	const errors = accountValidator.getErrorsNewAccount(account)
	
	if(0 < errors.length){
		callback(errors, null)
		return
	}
	
	//Database shit
	createAccountRepository.createAccount(account, callback)
	
}