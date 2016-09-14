//Q for code review: why do we declare variables for require?
var request = require("request")
var func = require("./functions.js")
var fs = require("fs")
var key = require('dotenv').config()
token = process.env.token
// console.log(token)


function getRepoContributors(repoOwner, repoName, callback) {
  // console.log(arguments.length)
  if (!token){
      throw new Error('You have no token!');
  }
  if (process.argv[3] === undefined || !(process.argv[4]===undefined)){
      throw new Error('Congratulations, you just played yourself. I need exactly TWO arguments!');
  }
  if (key === false){
      throw new Error('I can grab you some pictures but you got no .env file!');
  }
    requestData = func.auth('https://api.github.com', repoOwner, repoName)
    request.get(requestData, function(err, response, body) {
        if (err) {
          throw (err);
        }
        var data = JSON.parse(body)
        if (data.message === "Bad credentials"){
            throw new Error('You just played yourself. Make sure your token is correct \n Check out the .env file');
        }
        if (!(response.headers.status === "200 OK")) {
            throw new Error('You just played yourself. Check if your github repo or github user really exists');
        } else {
          // console.log("print pictures")
          var urlList = [] 
          for (var everyObject of data){
            urlList.push(everyObject.avatar_url)
          }
            callback(null, urlList)
        }
    })
}
// console.log(process.argv[4])
getRepoContributors(process.argv[2], process.argv[3], func.manyPrints)










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













