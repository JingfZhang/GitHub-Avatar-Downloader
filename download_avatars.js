const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  let option = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    header: {
      "User-Agent": "request"
    }

  };

  request(option, function(err, res, body) {
    cb(err, cb);
  });


}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});