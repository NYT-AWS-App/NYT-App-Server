//
// app.get('/nyt_search', async (req, res) => {...});
//
// Makes an API call to New York Times to return the 10 most relevant
// articles for a given search term (headline, author, date, or keyword)
//

exports.nyt_search = async (req, res) => {

  console.log("call to /nyt_search...");

  const mySecret = process.env['API Key'];

  var search_filter = req.query.search_filter;
  var search_term = req.query.search_term;

  try {

    // KEYWORD
    if (search_filter === "keyword") {
      try {
        // Search by query param
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search_term}&api-key=${mySecret}`);
        const nyt_data = await response.json();
        if (response.status === "ERROR") {
          res.status(400).json({"message": "ERROR", "data": []});
        }
        res.json({"message": "success", "data": nyt_data});
      } catch (error) {
        res.status(400).json({"message": error, "data": []});
      }
    // HEADLINE
    } else if (search_filter === "headline") {
      try {
        // Search by filter query (headline)
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:("${search_term}")&api-key=${mySecret}`);
        const nyt_data = await response.json();
        if (response.status === "ERROR") {
          res.status(400).json({"message": "ERROR", "data": []});
        }
        res.json({"message": "success", "data": nyt_data});
      } catch (error) {
        res.status(400).json({"message": error, "data": []});
      }
    // AUTHOR
    } else if (search_filter === "author") {
      try {
        // Search by filter query (byline)
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=byline:("${search_term}")&api-key=${mySecret}`);
        const nyt_data = await response.json();
        if (response.status === "ERROR") {
          res.status(400).json({"message": "ERROR", "data": []});
        }
        res.json({"message": "success", "data": nyt_data});
      } catch (error) {
        res.status(400).json({"message": error, "data": []});
      }
    // DATE (YYYY-MM-DD)
    } else if (search_filter === "date") {
      try {
        // Search by filter query (pub_date)
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=pub_date:("${search_term}")&api-key=${mySecret}`);
        const nyt_data = await response.json();
        if (response.status === "ERROR") {
          res.status(400).json({"message": "ERROR", "data": []});
        }
        res.json({"message": "success", "data": nyt_data});
      } catch (error) {
        res.status(400).json({"message": error, "data": []});
      }
    }
    
  }
  catch (err) {
    res.status(400).json({
      "message": err.message,
      "data": []
    });
  }

}
