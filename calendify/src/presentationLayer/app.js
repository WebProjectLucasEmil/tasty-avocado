//TODO: CSRF protection across all routes

// const token = require('csurf')
// const csrfProtection = token({ cookie: true })
// var cookieSession = require('cookie-session')
// var cookieParser = require('cookie-parser')
// app.use(csrfProtection())
// app.use(cookieSession())
// app.use(cookieParser())

const { response, Router, request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require("express-session")
const bodyParser = require('body-parser')
// const RedisStore = ConectRedis(session)
//routers------------------------------------------------------
const variousRouter = require('./routers/various-router')
const loginRouter = require("./routers/login-router")
//-------------------------------------------------------------

const app = express()



app.engine(".hbs", expressHandlebars({
  defaultLayout: "main.hbs"
}))

app.use(express.static(__dirname + '/public'));

app.set("views", "src" + "/presentationlayer/views")

app.use(express.static("./public/images"))

app.use(bodyParser.urlencoded({
  extended: false
}))


app.use('/', variousRouter)
app.use('/account', loginRouter)


app.listen(8080, function () {
  console.log("listen port your mom")
})