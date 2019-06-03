var cheerio = require("cheerio");
var axios = require("axios");


var scrape = function () {
    // First, we grab the body of the html with axios
    axios.get("https://www.ole.com.ar/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("article h1 > a").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).text();

            result.link = $(this).attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
    });
};

//   var scrape = function (cb) {
//     axios.get("https://www.npr.org").then(function (response) {
//         var $ = cheerio.load(response.data);

//         // Now, we grab every h2 within an article tag, and do the following:
//         $(".hp-item").each(function (i, element) {
//             // Save an empty result object
//             var results = {};

//             results.title = $(element).find("h3.title").text();
//             results.url = $(element).find("a").attr('href');
//             results.description = $(element).find("p.teaser").text();

//             console.log(results);

//         });
//     });
//     cb(results);

module.exports = scrape;