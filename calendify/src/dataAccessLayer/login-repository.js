const { response, Router, request } = require('express')
const express = require('express')
const expressSession = require('express-session')
const app = express()

function getAdminUsername (){
  const adminUsername = "admin"
  return adminUsername
}

function getAdminPassword(){
  const adminPassword = "abc123"
  return adminPassword
}
module.exports = {getAdminUsername,getAdminPassword}

// exports.session= function (callback){
//   app.use(expressSession({
//     secret: "asdkjfhzcxvhjgasdfjhagsdcivo",
//     saveUninitialized: false,
//     resave: false,
//     store: new SQLiteStore({
//       db: "sessions.db"
//     })
//   }))
// }

// exports.sessionLoggedIn = function (callback){
//   app.use(function (request, response, next) {
//     const isLoggedIn = request.session.isLoggedIn
  
//     response.locals.isLoggedIn = isLoggedIn
//     next()
//   })
// }