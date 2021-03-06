var cheerio = require("cheerio");
var axios = require("axios");

var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({
            "saved": false
        }, function (error, data) {
            var hbsObject = {
                article: data
            };
            res.render("index", hbsObject);
        });
    });

    app.get("/saved", function (req, res) {
        db.Article.find({
            saved: true
        }).populate("notes")
            .exec(function (error, articles) {
                var hbsObject = {
                    article: articles
                };
                res.render("saved", hbsObject);
            });
    });
    app.get("/scrape", function (req, res) {
        axios.get("https://www.ole.com.ar/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            $("article").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).find("h1").text();
                result.link = "https://www.ole.com.ar"+ $(this).find("a").attr("href");
                result.summary = $(this).find("div.entry-excerpt").text();
            
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

            res.send("Scrape complete");
        });
    });

    app.get("/articles", function(req,res){
        db.Article.find({}).sort({
            created:-1
        }).then(function(dbArticle){
            res.json(dbArticle);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.put("/article/save/:id", function (req, res) {

        var id = req.params.id;
        db.Article.findOneAndUpdate({
            _id: id
        }, {
                "saved": true
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.post("/articles/delete/:id", function (req, res) {
        db.Article.findOneAndUpdate({
            "_id": req.params.id
        }, {
                "saved": false,
                "notes": []
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.get("/article/clear", function (req, res) {
        db.Article.deleteMany({})
            .then(function (dbArticle) {
                res.render("/");
            }).catch(function (err) {
                res.json(err);
            });
        res.send(true);
    });

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({
            _id: req.params.id
        })
            .populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                    $push: {
                        note: dbNote._id
                    }
                }, {
                    new: true
                });
        })
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/note/delete/:id", function (req, res) {
        db.Note.findByIdAndDelete({
            "_id": req.params.id
        }).then(function (dbNote) {
            // res.json(dbNote);
        }).catch(function (err) {
            res.json(err);
        });
        res.send(true);
    });
};

