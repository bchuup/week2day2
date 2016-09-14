//Q for code review: why do we declare variables for require?
var fs = require("fs")
var request = require("request")
var func = require("./functions.js")


fs.exists('.env', (exists) => {
  if(!exists){
    fs.writeFile(".env", "I just made you an .env file to place your token \n ddfa  ", function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("I just made you an .env file, which you will need in order to proceed! \n Please enter the following inside the file: \n token = '\Your Token'\ ")
    });
  }
});

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
          callback(err);
        }
        if (!(response.headers.status === "200 OK")) {
            throw new Error('You just played yourself. Check if your github repo or github user really exists');
        } else {
          console.log("print pictures")
          // var data = JSON.parse(body)
          // var urlList = [] 
          // for (var everyObject of data){
          //   urlList.push(everyObject.avatar_url)
          // }
          //   callback(null, urlList)
        }
    })
}
// console.log(process.argv[4])
getRepoContributors(process.argv[2], process.argv[3], func.manyPrints)
























