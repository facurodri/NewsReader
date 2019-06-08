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
// var router = express.Router();

// Use morgan logger for logging request
app.use(logger("dev"));
//Makes public a static folder

//Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.use(express.json());

//Mongo DB connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
// mongoose.connect(db, function(error){
//     if (error){
//         console.log(error);
//     } else {
//         console.log("mongoose connection successful!");
//     }
// });
//Handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// require Routes file
require("./routes/apiRoutes")(app);

//Start Server
app.listen(PORT, function () {
    console.log("App running on port" + PORT + "!");
});