//
// app.put('/user', async (req, res) => {...});
//
// Inserts a new user into the database
//
const dbConnection = require("./database.js");

exports.put_user = async (req, res) => {
  console.log("call to /user...");

  try {
    var data = req.body; // data => JS object

    //CHECK IF USERNAME IS TAKEN
    sql_user_query = `SELECT * FROM users WHERE username = ?`;
    dbConnection.query(sql_user_query, [data.username], function (err, result) {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
        return;
      }
      if (result.length != 0) {
        res.status(400).json({
          message: "Username already taken! Try again.",
        });
      }

      console.log("/user: inserting new user into RDS...");
      //USERNAME IS NOT TAKE AND PROCEED WITH INSERTING USER
      var insert_sql = `INSERT INTO users (username, pwdhash, bucketfolder) VALUES (?,?,?)`;
      dbConnection.query(
        insert_sql,
        [data.username, data.pwdhash, data.bucketfolder],
        function (err, result) {
          if (err) {
            res.status(400).json({
              message: err.message,
            });
            return;
          }
          res.json({
            message: "New user created",
            userid: result.insertId,
          });
        }
      );
    });
  } catch (err) {
    //try
    console.log("**ERROR:", err.message);

    res.status(400).json({
      message: err.message,
      userid: -1,
    });
  } //catch
}; //put
