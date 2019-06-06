var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

// Port Connection
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
// Express Router
var router = express.Router();
// require Routes file
require("./config/routes")(router);

// Use morgan logger for logging request
app.use(logger("dev"));
//Makes public a static folder
app.use(express.static(__dirname + "/public"));

//Handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine","handlebars");

//Parse request body as JSON
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(router);

//Mongo DB connection
var db = process.envMONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, function(error){
    if (error){
        console.log(error);
    } else {
        console.log("mongoose connection successful!");
    }
});


//Start Server
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
});