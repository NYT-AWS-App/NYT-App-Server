//
// app.delete('/delete_article', async (req, res) => {...});
//
// Deletes the specified article from S3 and RDS
//

const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3, s3_bucket_name, s3_region_name } = require("../aws.js");
const dbConnection = require("../database.js");

exports.delete_article = async (req, res) => {
  console.log("call to /delete...");

  var body = req.body;
  var user_id = body.userid;
  var article_id = body.articleid;

  try {
    sql =
      "SELECT bucketfolder FROM users WHERE userid = ?; \
               SELECT bucketkey FROM articles WHERE userid=? AND articleid=?; \
               DELETE FROM articles WHERE userid=? AND articleid=?;";

    dbConnection.query(
      sql,
      [user_id, user_id, article_id, user_id, article_id],
      async function (err, results) {
        if (err) {
          res.status(400).json({
            message: err.message,
          });
          return;
        }

        if (results[0].length === 0) {
          res.status(400).json({
            message: "User not found...",
          });
          return;
        } else if (results[1].length === 0) {
          res.status(400).json({
            message:
              "Article not found... Does the inputted article belong to the inputted user?",
          });
          return;
        } else if (results[2].affectedRows === 0) {
          res.status(400).json({
            message: "Error deleting article...",
          });
          return;
        }

        var bucketfolder = results[0][0].bucketfolder;
        var bucketkey = results[1][0].bucketkey;
        var full_bucket_key = bucketfolder + "/" + bucketkey + ".txt";

        try {
          const input = {
            Bucket: s3_bucket_name,
            Key: full_bucket_key,
          };
          const command = new DeleteObjectCommand(input);
          await s3.send(command);

          res.json({
            message: "Article deleted successfully!",
          });
        } catch (error) {
          res.status(400).send({
            message: error.message,
          });
        }
      }
    );
  } catch {
    res.status(400).send({
      message: error.message,
    });
  }
};
