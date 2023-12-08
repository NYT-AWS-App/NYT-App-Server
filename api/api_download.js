//
// app.get('/download/:articleid', async (req, res) => {...});
//
// Inserts a new user into the database
//
const dbConnection = require("../database.js");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, s3_bucket_name, s3_region_name } = require("../aws.js");

exports.get_download = async (req, res) => {
  console.log("call to /download...");

  try {
    var articleid = req.params.articleid;
    var userid = req.params.userid;
    dbConnection.query(
      "SELECT * FROM users WHERE userid = ?",
      [userid],
      async function (error, result) {
        if (error) {
          res.status(400).json({
            message: error.message,
            data: "",
          });
          return;
        }
        if (result.length == 0) {
          res.status(400).json({
            message: "No such user...",
            data: "",
          });
          return;
        } else {
          dbConnection.query(
            "select * from articles where articleid = ? and userid = ?",
            [articleid, userid],
            async function (err, rows) {
              if (err) {
                res.status(400).json({
                  message: err.message,
                  data: "",
                });
                return;
              }
              if (rows.length == 0) {
                res.status(400).json({
                  message:
                    "Article not found... Does the inputted article belong to the inputted user?",
                  data: "",
                });
                return;
              }
              bucketfolder = result[0].bucketfolder;
              full_bucket_key = bucketfolder + "/" + rows[0].bucketkey + ".txt";
              try {
                const input = {
                  Bucket: s3_bucket_name,
                  Key: full_bucket_key,
                };
                // Create encoded string of data using AWS's GetObjectCommand
                const command = new GetObjectCommand(input);
                const result = await s3.send(command);
                var datastr = await result.Body.transformToString("base64");
                res.json({
                  message: "Article downloaded successfully!",
                  data: datastr,
                });
              } catch (error) {
                res.status(400).json({
                  message: error.message,
                  data: "",
                });
              }
            }
          );
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
}; //put
