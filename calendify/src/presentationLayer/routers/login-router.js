const express = require('express')

const bodyParser = require('body-parser')
const parseForm = bodyParser.urlencoded({ extended: false })


const loginManager = require("../../businessLayer/login-manager")

const router = express.Router()




router.post('/login', parseForm, (req, res) =>{
  const enteredUsername = req.body.username
  const enteredPassword = req.body.password
  
  loginManager.loginMan(enteredUsername, enteredPassword)
  const {username, password} = req
  //TODO: check if the credentials are correct
  //TODO:...

  //Assume the credentials are correct
  req.session.clientId = enteredUsername
  req.session.myNum = 5

  res.json("You are now logged in")
})

router.use((req, res, next) =>{
  if (!req.session || !req.session.clientId) {
    const err = new Error("You shall not pass!")
    err.statusCode = 401
    next(err)
  }
})


router.post("/logout", parseForm, function (request, response) {
  // request.session.isLoggedIn = false
  console.log("never gonna let you down...")
  response.redirect("/")
})

module.exports = router

