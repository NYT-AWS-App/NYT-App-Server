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

const express = require('express');
const app = express();
const config = require('./config.js');

const dbConnection = require('./database.js')

app.use(express.json({strict: false, limit: "50mb"}));

app.listen(config.service_port, () => {
  startTime = Date.now();
  console.log('web service running...');
  process.env.AWS_SHARED_CREDENTIALS_FILE = config.photoapp_config;
});

app.get('/', (req, res) => {
  var uptime = Math.round((Date.now() - startTime) / 1000);
  res.json({
    "status": "running",
    "uptime-in-secs": uptime,
    "dbConnection": dbConnection.state
  });
});

//
// service functions:
//
var users = require('./api_users.js');

// //app.get('/stats', (req, res) => {...});
app.get('/users', users.get_users);  