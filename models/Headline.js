var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var headlineSchema = new Schema ({
    healine: {
        type: String,
        required: true,
        unique: true
    },
    summery: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type:Boolean,
        default: false
    }
});

var Headline = mongoose.model("Headline", headlineSchema);
module.exports = Headline;