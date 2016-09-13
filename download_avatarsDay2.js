//Q for code review: why do we declare variables for require?
var key = require('dotenv').config()
var request = require("request")
var fs = require("fs")
var func = require("./functions.js")
token = process.env.token


function getRepoContributors(repoOwner, repoName, callback) {
  requestData = func.auth('https://api.github.com', repoOwner, repoName)
  request.get(requestData, function(err, response, body) {
      if (err) {
        callback(err);
      }
      var data = JSON.parse(body)
      // console.log(data)
      var urlList = [] 
        for (var everyObject of data){
          urlList.push(everyObject.avatar_url)
        }
          callback(null, urlList)
  });
}


getRepoContributors('lighthouse-labs', 'laser_shark', func.manyPrints)


























