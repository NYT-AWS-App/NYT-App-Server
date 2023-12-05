//
// Express js (and node.js) web service that interacts with
// AWS S3 and RDS to provide clients data for building a
// simple photo application for photo storage and viewing.
//
//
// Authors:
//  Patrick Hoey, Macy Bosnich, Griffin Minster, Will Hoffmann
//  Prof. Joe Hummel (initial template)
//  Northwestern University
//  CS 310
//
// References:
// Node.js:
//   https://nodejs.org/
// Express:
//   https://expressjs.com/
// MySQL:
//   https://expressjs.com/en/guide/database-integration.html#mysql
//   https://github.com/mysqljs/mysql
// AWS SDK with JS:
//   https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html
//   https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
//   https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/
//   https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
//

const express = require("express");
const app = express();
const config = require("./config.js");

const dbConnection = require("./database.js");

app.use(express.json({ strict: false, limit: "50mb" }));

app.listen(config.service_port, () => {
  startTime = Date.now();
  console.log("web service running...");
  process.env.AWS_SHARED_CREDENTIALS_FILE = config.config_file;
});

app.get("/", (req, res) => {
  var uptime = Math.round((Date.now() - startTime) / 1000);
  res.json({
    status: "running",
    "uptime-in-secs": uptime,
    dbConnection: dbConnection.state,
  });
});

//
// service functions:
//
var add_user = require("./api_user.js");
var nyt_search = require("./api_nyt_search.js");
var save = require("./api_save.js");
var search = require("./api_search.js");
var articles = require("./api_articles.js");
var download = require("./api_download.js");
var delete_article = require("./api_delete.js");
var get_users = require("./api_users.js");

app.put("/add_user", add_user.put_user);
app.get("/nyt_search", nyt_search.nyt_search);
app.put("/save", save.put_save);
app.get("/search", search.article_search);
app.get("/articles", articles.get_articles);
app.get("/download/:articleid", download.get_download);
app.delete("/delete", delete_article.delete_article);
app.get("/users", get_users.get_users);
