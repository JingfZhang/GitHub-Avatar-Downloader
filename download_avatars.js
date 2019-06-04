const request = require("request");
const secrets = require("./secrets.js");
const fs = require("fs");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

  const option = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "token " + secrets.GITHUB_TOKEN
    }

  };

  request(option, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}

function printAvatarUrl(err, body){
  let bodyArray = JSON.parse(body);
  for(let objct of bodyArray) {
    let savePath = "./" + objct.login + ".jpg";
    downloadImageByURL(objct.avatar_url, savePath);
  }
}

getRepoContributors("jquery", "jquery", printAvatarUrl);