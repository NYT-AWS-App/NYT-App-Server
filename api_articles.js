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

    articles_sql = `SELECT * FROM articles WHERE userid = ? LIMIT 10`;
    dbConnection.query(articles_sql, [data.userid], function (err, result) {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
      }
      if (result.length == 0) {
        res.json({
          message: "No articles found",
          articles: [],
        });
      } else {
        res.json({
          message: "Articles found",
          articles: result,
        });
      }
    });
  } catch (err) {
    //try
    console.log("**ERROR:", err.message);

    res.status(400).json({
      message: err.message,
    });
  } //catch
}; //get
