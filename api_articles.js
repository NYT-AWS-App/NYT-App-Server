//
// app.get('/articles', async (req, res) => {...});
//
// Retrieves user's saved articles
//
const dbConnection = require("./database.js");

exports.get_articles = async (req, res) => {
  console.log("call to /articles...");

  try {
    data = req.body;

    articles_sql = `SELECT * FROM users WHERE userid = ?;
                    SELECT * FROM articles WHERE userid = ?;`;
    dbConnection.query(
      articles_sql,
      [data.userid, data.userid],
      function (err, result) {
        if (err) {
          res.status(400).json({
            message: err.message,
          });
          return;
        }
        if (result[0].length == 0) {
          res.status(400).json({
            message: "No such user...",
          });
          return;
        }
        if (result[1].length == 0) {
          res.status(400).json({
            message: "No articles found...",
            articles: [],
          });
          return;
        } else {
          res.json({
            message: "Articles found",
            articles: result[1],
          });
        }
      }
    );
  } catch (err) {
    //try
    console.log("**ERROR:", err.message);

    res.status(400).json({
      message: err.message,
    });
  } //catch
}; //get
