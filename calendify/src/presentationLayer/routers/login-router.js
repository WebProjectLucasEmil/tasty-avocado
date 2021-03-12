const express = require('express')

const bodyParser = require('body-parser')
const parseForm = bodyParser.urlencoded({ extended: false })


const loginManager = require("../../businessLayer/login-manager")

const router = express.Router()


// router.post("/login", parseForm, function (request, response) {
//   //login

//   const enteredUsername = request.body.username
//   const enteredPassword = request.body.password
//   loginManager.loginRout(enteredUsername, enteredPassword, isLoggedIn)
// })



router.post("/logout", parseForm, function (request, response) {
  request.session.isLoggedIn = false
  console.log("never gonna let you down...")
  response.redirect("/")
})
module.exports = router
