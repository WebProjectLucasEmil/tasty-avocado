// var path = require('path')
const express = require('express')
const loginManager = require("../../businessLayer/login-manager")
// function loginRout(enteredUsername, enteredPassword){
//   loginManager.loginMan(enteredUsername, enteredPassword)
// }

const token = require('csurf')
const bodyParser = require('body-parser')
const csrfProtection = token({ cookie: false })
const parseForm = bodyParser.urlencoded({ extended: false })
const router = express.Router()


router.post("/login", parseForm, function (request, response) {
  //login
  const enteredUsername = request.body.username
  const enteredPassword = request.body.password
  loginManager.loginRout(enteredUsername, enteredPassword, isLoggedIn)
})

router.post("/logout", parseForm, function (request, response) {
  request.session.isLoggedIn = false
  console.log("never gonna let you down...")
  response.redirect("/")
})
module.exports = router
