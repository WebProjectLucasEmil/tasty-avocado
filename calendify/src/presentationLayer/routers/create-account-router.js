const express = require('express')
const createAccountManger = require("../../businessLayer/create-account-manager")
const token = require('csurf')
const bodyParser = require('body-parser')
const csrfProtection = token({ cookie: false })
const parseForm = bodyParser.urlencoded({ extended: false })
const router = express.Router()

router.get("/", (req, res)=>{
    res.render("create-account.hbs")
})

router.post("/", parseForm, function (request, response) {
    //create account
    const account = {
        name: request.body.n,
        username: request.body.u,
        password:  request.body.p
    }
    createAccountManger.createAccount(account, function(errors, id){
        if(errors.length == 0){
            response.redirect("/")
        }else{
            
            const errorTranslations = {
                usernameTooShort: "The username needs to be at least 3 characters.",
                usernameTooLong: "The username can´t be longer than 30 characters.",
                internalError: "Cant query out the request now.",
                usernameTaken: "Username already in use."
            } 
            
            const errorMessages = errors.map(e => errorTranslations[e])
            
            const model = {
                errors: errorMessages,
                username: account.username,
                password: account.password
            }
            
            response.render("create-account.hbs", model)
            
        }
    })
  })

module.exports = router