//
// app.get('/article_search', async (req, res) => {...});
//
// Searches through RDS for matching search terms to find saved articles
//

const { s3, s3_bucket_name, s3_region_name } = require('./aws.js');
const dbConnection = require('./database.js');

exports.article_search = async (req, res) => {

    console.log("call to /search...");

    var user_id = req.query.userid;
    var search_filter = req.query.filter;
    var search_term = req.query.term;

    var sql_param_list = []

    try {
        if (search_filter == "headline") {
            sql = `SELECT * FROM articles WHERE userid=? AND headline LIKE CONCAT('%', ?, '%');`
            sql_param_list = [user_id, search_term]
        }
        else if (search_filter == "author") {
            split_term = search_term.split(" ", 2)
            author_first = split_term[0]
            if (split_term.length > 1) {
                author_last = split_term[1]
                sql_param_list = [user_id, author_first, author_last]
            }
            else {
                sql_param_list = [user_id, author_first, author_first]
            }
            sql = `SELECT * FROM articles WHERE userid=? AND authorfirst LIKE CONCAT('%', ?, '%') OR authorlast LIKE CONCAT('%', ?, '%');`
        }
        else if (search_filter == "pubdate") {
            sql = `SELECT * FROM articles WHERE userid=? AND pubdate LIKE CONCAT('%', ?, '%')`
            sql_param_list = [user_id, search_term]
        }
        else if (search_filter == "keyword") {
            sql = `SELECT * FROM articles WHERE articleid IN (SELECT articleid FROM keywords WHERE keyword LIKE CONCAT('%', ?, '%'));`
            sql_param_list = [search_term]
        }
        
        dbConnection.query(sql, sql_param_list, function (err, result) {
            if (err) {
                res.status(400).json({
                    "message": err.message
                });
                return;
            };
            if (result.length == 0) {
                res.status(400).json({
                    "message": "No results returned..."
                });
                return;
            };

            result_dict = {}
            for (let article of result) {
                article_dict = {
                                "headline": article.headline,
                                "pubdate": article.pubdate,
                                "author": `${article.authorfirst} ${article.authorlast}`
                               }
                result_dict[article.articleid] = article_dict
            }
            res.json({
                "message": "success",
                "data": result_dict
            });
        });
    }
    catch (error) {
        res.status(400).json({
            "message": error
        });
        return;
    }
}