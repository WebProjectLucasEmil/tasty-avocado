const express = require('express')
const createAccountManger = require("../../businessLayer/create-account-manager")
const token = require('csurf')
const bodyParser = require('body-parser')
const csrfProtection = token({ cookie: false })
const parseForm = bodyParser.urlencoded({ extended: false })
const router = express.Router()

router.get("/create-account", (req, res)=>{
    res.render("create-account.hbs")
})

router.post("/create-account", parseForm, function (request, response) {
    //cfreate acietyabn
    const account = {
        username:  request.body.username,
        password:  request.body.password
    }
    createAccountManger.createAccount(account, function(){
        
    })
  })

module.exports = router