const { response, Router, request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const token = require('csurf')
// const nodemon = require('nodemon')

const app = express()


app.engine(".hbs", expressHandlebars({
  defaultLayout: "main.hbs"
}))

app.use(express.static("src/static"))

app.set("views", "src" + "/views")

app.use(express.static("./public/images"))

app.use(bodyParser.urlencoded({
  extended: false
}))

app.get("/", csrfProtection, function (request, response) {
  response.render("index.hbs", {token: request.csrfToken()})
})

app.listen(8080, function() {
  console.log("listen port your mom")
})