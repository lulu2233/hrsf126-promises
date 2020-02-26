/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var { pluckFirstLineFromFileAsync } = require('./promiseConstructor');
var { getGitHubProfileAsync } = require('./promisification');

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function (username) {
      if (!username) {
        throw new Error('Username does not exist');
      }

      return getGitHubProfileAsync(username);
    })
    .then(function (body) {
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(body), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
