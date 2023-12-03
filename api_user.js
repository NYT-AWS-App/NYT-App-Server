//
// app.put('/user', async (req, res) => {...});
//
// Inserts a new user into the database
//
const dbConnection = require('./database.js')

exports.put_user = async (req, res) => {

  console.log("call to /user...");

  try {

    var data = req.body;  // data => JS object
    
    console.log("/user: inserting new user into RDS...");
    var insert_sql = `INSERT INTO users (username, pwdhash, bucketfolder) VALUES ("?","?","?")`
    dbConnection.query(insert_sql, [data.username, data.pwdhash, data.bucketfolder], function (
  
    }//try
    catch (err) {
      console.log("**ERROR:", err.message);
  
      res.status(400).json({
        "message": err.message,
        "userid": -1
      });
    }//catch

}//put
