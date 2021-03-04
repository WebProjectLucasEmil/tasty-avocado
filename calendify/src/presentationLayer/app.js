const { response, Router, request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const bodyParser = require('body-parser')

const token = require('csurf')
const sqlite3 = require("sqlite3")
const SQLiteStore = require('connect-sqlite3')(expressSession)

//routers------------------------------------------------------
var loginRouter = require("./routers/login-router")

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

const adminUsername = "admin"
const adminPassword = "$2a$10$.WNk7GjUq5cBvbWbuXVO5Ok8ksPm4y5TTLZOY3GajRXC.ECn6PyZ6"

app.engine(".hbs", expressHandlebars({
  defaultLayout: "main.hbs"
}))

// app.use(express.static("src/static"))
app.use(express.static(__dirname + '/public'));

app.set("views", "src" + "/presentationlayer/views")

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
  //login
  loginRouter.loginRout()
})

app.get("/create-account", csrfProtection, function(request, response){
  response.render("create-account.hbs", {token: request.csrfToken() })
})

app.post("/logout", csrfProtection, parseForm, function (request, response) {
  request.session.isLoggedIn = false
  console.log("never gonna let you down...")
  response.redirect("/")
})


app.listen(8080, function () {
  console.log("listen port your mom")
})