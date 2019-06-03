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
    let bodyArray = JSON.parse(body);
    for(let objct of bodyArray) {
      cb(err, objct.avatar_url);
    }
  });

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}

}

function printAvatarUrl(err, avatarUrl){
  console.log(avatarUrl);
}

getRepoContributors("jquery", "jquery", printAvatarUrl);