//Q for code review: why do we declare variables for require?
var key = require('dotenv').config()
var request = require("request")
var fs = require("fs")

token = process.env.token


// function to create object necessary for authentication
var createAuthenticationObj = function (url, owner, repo){
  var requestData = {
    url:`${url}/repos/${owner}/${repo}/contributors`,
    auth: {bearer: `${token}`},
    headers: {'User-Agent': 'request'}
    }
  return requestData
};

// downloads image into pictures file
function downloadImageByURL(url, path, callback) {
  request(url)
  .pipe(fs.createWriteStream(path))
  .on('close', function() {
    callback("download complete");
  });
}

// print urls
function manyPrints(err, urls){ //urls is an array of urls
  if (err) {
    throw err;
  }
  for (imageUrl of urls){
    var idarr = imageUrl.match(/\d{2,}/)
    var id = idarr[0]
    downloadImageByURL(imageUrl, `./pictures/${id}.png`, console.log)
  }
}

function getRepoContributors(repoOwner, repoName, callback) {
  requestData = createAuthenticationObj('https://api.github.com', repoOwner, repoName)
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


getRepoContributors('lighthouse-labs', 'laser_shark', manyPrints)


























