//TODO: CSRF protection across all routes
//TODO: Re-structure and put redis to appropiate layers
//TODO: Make a login, and ofcourse, put it in the correct layers

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
const redis = require("redis")
const connectRedis = require("connect-redis")
const RedisStore = connectRedis(session)


//routers------------------------------------------------------
const variousRouter = require('./routers/various-router')
const loginRouter = require("./routers/login-router")
const createAccountRouter = require("./routers/create-account-router")
//-------------------------------------------------------------

const app = express()



//set up expressHandelbars
app.engine(".hbs", expressHandlebars({
  defaultLayout: "main.hbs"
}))
app.use(express.static(__dirname + '/public'));
app.set("views", "src" + "/presentationlayer/views")
app.use(express.static("./public/images"))



//Attatch all routers---------------
app.use('/', variousRouter)
app.use('/account', loginRouter)
app.use('/create-account', createAccountRouter)
//----------------------------------




//* If using proxy (e.g nginx)
// app.set("trust proxy",1)

//*1 Configure our redis
const redisClient = redis.createClient({
  port: 6379,
  host: "redis",
  password: "mypassword"
})


//*2 Configure session middleware
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: "mySecret",
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false, //if true: only transmit cookie over https
    httpOnly: true, //if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 30 //session max age in milliseconds
  }
}))



//*4 plug in another middleware that will check if the user is authenticated or not
//* all requests that are plugged in will after this middleware will only be accessible if the user is logged in


//*5 plug in all routes that the user can only access if logged in
//*eg:
// router.get("/profile", (req,res,next) => {/*check if user has sufficent privileges*/ next()},
// (req,res) =>{

// })



app.listen(8080, function () {
  console.log("Server is running on port 8080")
})