const { response, Router, request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const bodyParser = require('body-parser')

const token = require('csurf')
const sqlite3 = require("sqlite3")
const SQLiteStore = require('connect-sqlite3')(expressSession)


const loginRouter = require("./routers/login-router.js")
const createAccountRouter = require("./routers/create-account-router.js")
const createAccountManager = require("../businessLayer/create-account-manager.js")
const createAccountRepository = require("../dataAccessLayer/create-account-repository")
    //app.use(loginRouter)
    //app.use(createAccountRouter)

//const createAccountRouter = require('./routers/create-account-router.js')

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

const adminUsername = "admin"
const adminPassword = "$2a$10$.WNk7GjUq5cBvbWbuXVO5Ok8ksPm4y5TTLZOY3GajRXC.ECn6PyZ6"

app.engine(".hbs", expressHandlebars({
    defaultLayout: "main.hbs"
}))

//app.use(express.static("/css"))
app.use(express.static(__dirname + '/public'));

app.set("views", "src" + "/views")

app.use(express.static("./public/images"))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(function(request, response, next) {
    const isLoggedIn = request.session.isLoggedIn

    response.locals.isLoggedIn = isLoggedIn
    next()
})

app.get("/", csrfProtection, function(request, response) {
    response.render("index.hbs", { token: request.csrfToken() })
})

app.post("/", csrfProtection, parseForm, function(request, response) {
    //login
    loginRouter.login()
})

app.post("/logout", csrfProtection, parseForm, function(request, response) {
    request.session.isLoggedIn = false
    console.log("never gonna let you down...")
    response.redirect("/")
})

app.get("/createAccount.hbs", csrfProtection, function(request, response) {
    response.render("createAccount.hbs", { token: request.csrfToken() })
})

app.post("/createAccount", function(request, response) {
    createAccountRouter.createAccount()

})

app.listen(8080, function() {
    console.log("listen port 8080 nice")
})