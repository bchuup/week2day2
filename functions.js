var request = require("request")
var fs = require("fs")



//creates requestData which is an object storing authorization data
var createAuthenticationObj = function (url, owner, repo){
  var requestData = {
    url:`${url}/repos/${owner}/${repo}/contributors`,
    auth: {bearer: `${token}`},
    headers: {'User-Agent': 'request'}
    }
  return requestData
};


var manyPrints = function (err, urls){ //urls is an array of urls which is produced by getRepoContributors
  if (err) {
    throw err;
  }
  for (imageUrl of urls){
    var idarr = imageUrl.match(/\d{2,}/)
    var id = idarr[0]
    downloadImageByURL(imageUrl, `./pictures/${id}.png`, console.log)
  }
}

//Downloads images into a file -> used in manyPrints
var downloadImageByURL = function (url, path, log) { //log is console.log
  fs.access(path, fs.F_OK, (err) => { // ask mentors how to read documentation re: fs.constants.F_OK
    if (err){
    console.log(err ? 'There is no folder to put your pictures!' : 'can read/write')
    throw err
    } else {
    request(url)
    .pipe(fs.createWriteStream(path))
    .on('close', function() {log("download complete")});
    }
  })
}






module.exports = {
  auth: createAuthenticationObj,
  downloadimg: downloadImageByURL,
  manyPrints: manyPrints
}
