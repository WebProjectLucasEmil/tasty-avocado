const bcrypt = require('bcryptjs')
const { response, Router, request } = require('express')

const loginRepository = require("../dataAccessLayer/login-repository")


function loginMan(enteredUsername, enteredPassword){
    //TODO: Re-structure login to appropiate layer, also only admin atm. Needs to be fixed as well.
    const adminUsername = loginRepository.getAdminUsername()
    const adminPassword = loginRepository.getAdminPassword()
    // const adminPassword = "$2a$10$.WNk7GjUq5cBvbWbuXVO5Ok8ksPm4y5TTLZOY3GajRXC.ECn6PyZ6"
    // const checkPassword = bcrypt.compareSync(enteredPassword, adminPassword)
 
    // if (enteredUsername == adminUsername && checkPassword) {
      if (enteredUsername == adminUsername && enteredPassword == adminPassword){
      //Login
      ////isLoggedIn = true
      console.log("never gonna give you up...")
      response.redirect("/")
    } else {
      //TODO:display error message to user
    }
}
module.exports = {loginMan}