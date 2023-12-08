//
// app.get('/users', async (req, res) => {...});
//
// Retrieves all user's information
//
const dbConnection = require("../database.js");

exports.get_users = async (req, res) => {
  console.log("call to /users...");

  try {
    sql = "SELECT * FROM users ORDER BY userid ASC";
    dbConnection.query(sql, function (err, results) {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
        return;
      } else {
        res.json({
          message: "success",
          users: results,
        });
        return;
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    return;
  }
};
