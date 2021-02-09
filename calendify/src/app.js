const { response, Router, request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const token = require('csurf')
const sqlite3 = require("sqlite3")
const SQLiteStore = require('connect-sqlite3')(expressSession)
// const nodemon = require('nodemon')

const csrfProtection = token({ cookie: false })
const parseForm = bodyParser.urlencoded({ extended: false })

const app = express()

app.use(expressSession({
  secret: "asdkjfhzcxvhjgasdfjhagsdcivo",
  saveUninitialized: false,
  resave: false,
  store: new SQLiteStore({
    db: "sessions.db"
  })
}))

//! DON'T FORGET TO MOVE THIS TO APPROPIATE LOG IN LAYER(if it isn't already, kek)--------------
const adminUsername = "admin"
const adminPassword = "$2a$10$.WNk7GjUq5cBvbWbuXVO5Ok8ksPm4y5TTLZOY3GajRXC.ECn6PyZ6"
//!--------------------------------------------------------------------------------------

app.engine(".hbs", expressHandlebars({
  defaultLayout: "main.hbs"
}))

app.use(express.static("src/static"))

app.set("views", "src" + "/views")

app.use(express.static("./public/images"))

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function (request, response, next) {
  const isLoggedIn = request.session.isLoggedIn

  response.locals.isLoggedIn = isLoggedIn
  next()
})

app.get("/", csrfProtection, function (request, response) {
  response.render("index.hbs", { token: request.csrfToken() })
})

app.post("/", csrfProtection, parseForm, function (request, response) {
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
})

app.post("/logout", csrfProtection, parseForm, function (request, response) {
  request.session.isLoggedIn = false
  console.log("never gonna let you down...")
  response.redirect("/")
})


app.listen(8080, function () {
  console.log("listen port your mom")
})