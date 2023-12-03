//
// app.get('/save', async (req, res) => {...});
//
// Saves a returned article to S3 and RDS
//

const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3, s3_bucket_name, s3_region_name } = require('./aws.js');
const dbConnection = require('./database.js');

exports.put_save = async (req, res) => {

  console.log("call to /save...");

  try {
    var data = JSON.parse(req.body);
    var userid = req.query.userid;
    var bucketfolder;

    //CHECK IF USER EXISTS
    sql_user_query = `SELECT * FROM users WHERE userid = ?`
    dbConnection.query(sql_user_query, [userid], function (err, result) {
      if (err) {
        res.status(400).json({
          "message": "check if user exists query failed"
        });
        return;
      };
      if (result.length == 0) {
        res.status(400).json({
          "message": "No such user..."
        });
        return;
      };
      bucketfolder = result[0].bucketfolder;
      //CHECK IF USER HAS ALREADY SAVED THIS ARTICLE
      sql_article_query = `SELECT * FROM articles WHERE bucketkey = ? and userid = ?`
      dbConnection.query(sql_article_query, [data.bucketkey, userid], function (err, result) {
        if (err) {
          res.status(400).json({
            "message": err.message
          });
          return;
        };
        if (result.length != 0) {
          res.status(203).json({
            "message": "You've already saved this article!"
          });
          return;
        };
        //SAVE THE ARTICLE TO RDS 
        sql_save_query = 'INSERT INTO articles (userid, url, headline, pubdate, newsdesk, sectionname, authorfirst, authorlast, bucketkey) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        dbConnection.query(sql_save_query, [userid, data.web_url, data.headline, data.pub_date, data.news_desk, data.section_name, data.first_name, data.last_name, data.bucketkey], async function (err, result) {
          if (err) {
            res.status(400).json({
              "message": err.message
            });
            return;
          };
          // GENERATE .txt AND UPLOAD TO S3
          const fileContent = `Headline: ${data.headline}\n\nPublished date: ${data.pub_date}\n\nAuthor: ${data.first_name} ${data.last_name}\n\nWeb URL: ${data.web_url}\n\nLead paragraph: ${data.lead_paragraph}\n\nKeywords: ${data.keywords}\n\nNews Desk: ${data.news_desk}`;
          const fileBuffer = Buffer.from(fileContent, 'utf-8');
          var full_bucket_key = bucketfolder + '/' + data.bucketkey + ".txt";
          const command = new PutObjectCommand({
            Bucket: s3_bucket_name,
            Key: full_bucket_key,
            Body: fileBuffer,
          });
          try {
            const response = await s3.send(command);
            res.status(200).json({
              "message": "Saved article to RDS and S3"
            });
          } catch (err) {
            res.status(400).json({
              "message": err.message
            });
          }
        });
      }); 
    }); 

    
  }
  catch (err) {
    res.status(400).json({
      "message": err.message,
      "data": []
    });
  }

}
