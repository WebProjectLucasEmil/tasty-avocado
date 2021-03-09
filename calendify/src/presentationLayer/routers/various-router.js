const express = require('express')

// const token = require('csurf')
// const csrfProtection = token({ cookie: false })
const router = express.Router()

router.get("/", function (request, response) {
  response.render("index.hbs")
})



module.exports = router