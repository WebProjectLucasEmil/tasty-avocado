const bcrypt = require('bcryptjs')

const loginRepository = require("../dataAccessLayer/login-repository")

function loginMan(){
    //TODO: Re-structure login to appropiate layer, also only admin atm. Needs to be fixed as well.
    const enteredUsername = request.body.username
    const enteredPassword = request.body.password
    
    const checkPassword = bcrypt.compareSync(enteredPassword, adminPassword)
    
    if (enteredUsername == adminUsername && checkPassword) {
      //Login
      request.session.isLoggedIn = true
      console.log("never gonna give you up...")
      response.redirect("/")
    } else {
      //TODO:display error message to user
    }
}