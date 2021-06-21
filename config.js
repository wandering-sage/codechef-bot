var process = require('process');

module.exports = {
  // This is where the files will be created.
  // Change this to your preference.
  codedir: process.argv[3] || "D:\\Competitive Programng",

  contestBaseUrl: "https://www.codechef.com/api/contests/",
  codechefUrl: "https://www.codechef.com/",
  contestCode: process.env.CONTEST || process.argv[2] || "JUNE21B",
}