// all related functions are located in functions.js file and exported in using modular exports

//Q for code review: why do we declare variables for require?
var request = require("request")
var func = require("./functions.js")
var fs = require("fs")
var key = require('dotenv').config()
token = process.env.token
// console.log(token)


function getRepoContributors(repoOwner, repoName, getUrls) {
  if (!token){
    func.createEnv()
  }
  if (process.argv[3] === undefined || !(process.argv[4]===undefined)){
      throw new Error('Congratulations, you just played yourself. I need exactly TWO arguments!');
  }
    requestData = func.auth('https://api.github.com', repoOwner, repoName) // requesting data, func.auth is a function that provides authorization details
    request.get(requestData, function(err, response, body) {
        if (err) {
          throw (err);
        }
        var data = JSON.parse(body)
        if (data.message === "Bad credentials"){
            throw new Error("I made an env file for you \n please enter your credentials \n Please enter the following \n token = '\<YOUR TOKEN>'\ ");
        }
        if (!(response.headers.status === "200 OK")) {
            throw new Error('You just played yourself. Check if your github repo or github user really exists');
        }
          // console.log("print pictures")
            getUrls(data) // printing function refers to func.manyPrints- prints all files into picture folder

    })
}
// console.log(process.argv[4])
getRepoContributors(process.argv[2], process.argv[3], func.getUrls)










// Still working on function to create env file when there is none
// var makeEnv = function(){
//   fs.exists('.env', (exists) => {
//     if(!exists){
//       fs.writeFile(".env", "Please enter the following \n token = '\ Your Token'\  ", function(err) {
//         if(err) {
//           return console.log(err);
//         }
//       })
//     }
//   })
// }













