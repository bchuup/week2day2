var request = require("request")
var func = require("./functions.js")
var fs = require("fs")
var key = require('dotenv').config()
token = process.env.token

var createEnv = function () { //log is console.log
  fs.access('.env', fs.F_OK, (err) => { // ask mentors how to read documentation re: fs.constants.F_OK
    if (err){
    console.log(err ? 'I made an env file for you \n please enter your credentials' : 'can read/write')
    throw err
    }
  })
}
createEnv()

writeEnv
fs.writeFile(".env", "Please enter the following \n token = '\ Your Token'\  ", function(err) {
  if(err) {return console.log(err);}
})