const { response, Router, request } = require('express')
const express = require('express')
const expressHandlebars = require('express-handlebars')
// const nodemon = require('nodemon')

const app = express()

app.engine(".hbs", expressHandlebars({
  defaultLayout: "main.hbs"
}))

app.use(express.static("static"))
app.use(express.static("./public/images"))

app.get('/', function(request, response){
  response.render("index.hbs")
})

app.listen(8080, function() {
  console.log("listen port your mom")
})