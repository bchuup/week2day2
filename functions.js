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

var getUrls = function (data){ //data is parsed body
  for (object of data){
    login = object.login
    imageUrl = object.avatar_url
    downloadImageByURL(imageUrl, `./avatars`, login, console.log) // found a bug- pictures wont download unless pictures are already in folder
  }
}

//Downloads images into a file -> used in manyPrints
var downloadImageByURL = function (url, path, login, log) { //log is console.log
  fs.access(path, fs.F_OK, (err) => { // ask mentors how to read documentation re: fs.constants.F_OK
    if (err){
    console.log(err ? 'There is no folder to put your pictures! \n create a folder called avatars in directory' : 'can read/write')
    throw err
    } else {
    request(url)
    .pipe(fs.createWriteStream(path+`/${login}.png`))
    .on('close', function() {log("download complete")});
    }
  })
}

var createEnv = function () { //log is console.log
  fs.access('.env', fs.F_OK, (err) => { // ask mentors how to read documentation re: fs.constants.F_OK
    if (err){
      fs.writeFile(".env", " ", function(err) {

        if(err) {return console.log(err);}
      })
    throw err
    }
  })
}






module.exports = {
  auth: createAuthenticationObj,
  downloadimg: downloadImageByURL,
  getUrls: getUrls,
  createEnv: createEnv
}
