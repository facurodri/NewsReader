// var cheerio = require("cheerio");
// var axios = require("axios");

// var db = require("../models");

// module.exports = function (app) {

//     app.get("/scrape", function (req, res) {
//         axios.get("https://www.ole.com.ar/").then(function (response) {
//             // Then, we load that into cheerio and save it to $ for a shorthand selector
//             var $ = cheerio.load(response.data);

//             $("article h1").each(function (i, element) {
//                 // Save an empty result object
//                 var result = {};

//                 // Add the text and href of every link, and save them as properties of the result object
//                 result.title = $(this).find(".entry-title").text();
//                 result.link = $(this).find("a").attr("href");
//                 result.summary = $(this).find(".entry-excerpt").text();
//                 // result.title = $(this).text();

//                 // result.link = $(this).attr("href");

//                 // result.description = $(this).find("entry-excerpt").text();

//                 // Create a new Article using the `result` object built from scraping
//                 db.Article.create(result)
//                     .then(function (dbArticle) {
//                         // View the added result in the console
//                         console.log(dbArticle);
//                     })
//                     .catch(function (err) {
//                         // If an error occurred, log it
//                         console.log(err);
//                     });
//                 console.log(result);
//             });

//         });
//         res.send("Scrape complete");
//     });

//     app.put("/article/save/:id", function (req, res) {

//         var id = req.params.id;
//         db.Article.findOneandUpdate({
//             _id: id
//         }, {
//                 "saved": true
//             })
//             .then(function (dbArticle) {
//                 res.json(dbArticle);
//             }).catch(function (err) {
//                 res.json(err);
//             });
//     });

//     app.post("/articles/delete/:id", function (req,res) {
//         db.Article.findOneandUpdate({
//             "_id":req.params.id
//         }, {
//             "saved":false,
//             "notes":[]
//         })
//         .then(function (dbArticle){
//             res.json(dbArticle);
//         }).catch(function(err) {
//             res.json(err);
//         });
//     });

//     app.get("/article/clear", function (req,res) {
//         db.Article.deleteMany({})
//         .then(function (dbArticle){
//             res.render("/");
//         }).catch(function (err){
//             res.json(err);
//         });
//         res.send(true);
//     });

//     app.get("/articles/:id", function (req,res) {
//         db.Article.findOne({
//             _id:req.params.id
//         })
//         .populate("note")
//         .then(function(dbArticle){
//             res.json(dbArticle);
//         })
//         .catch(function(err){
//             res.json(err);
//         });
//     });
    
//     app.post("/articles/:id", function (req, res){
//         db.Note(function (dbNote){
//             return db.Article.findOneandUpdate({
//                 _id:req.params.id
//             }, {
//                 $push: {
//                     note: dbNote._id
//                 }
//             }, {
//                 new:true
//             });
//         })
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         }).catch( function (err){
//             res.json(err);
//         });
//     });

//     app.delete("/note/delete/:id", function(req,res){
//         db.Note.findByIdAndDelete({
//             "_id":req.params.id
//         }).then(function (dbNote){
//             // res.json(dbNote);
//         }).catch(function (err){
//             res.json(err);
//         });
//         res.send(true);
//     });
// };

// //   var scrape = function (cb) {
//     //     axios.get("https://www.npr.org").then(function (response) {
//         //         var $ = cheerio.load(response.data);

//         //         // Now, we grab every h2 within an article tag, and do the following:
//         //         $(".hp-item").each(function (i, element) {
//             //             // Save an empty result object
//             //             var results = {};

//             //             results.title = $(element).find("h3.title").text();
//             //             results.url = $(element).find("a").attr('href');
//             //             results.description = $(element).find("p.teaser").text();

//             //             console.log(results);

//             //         });
//             //     });
//             //     cb(results);
//             // }

