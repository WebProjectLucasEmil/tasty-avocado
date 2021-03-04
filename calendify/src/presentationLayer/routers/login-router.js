// var path = require('path')
const express = require('express')
const loginManager = require("../../businessLayer/login-manager")
function loginRout(){
  loginManager.loginMan()
}
