var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var headlineSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type:Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    headlineTime: {
        type: String,
        require: true
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

var Headline = mongoose.model("Headline", headlineSchema);
module.exports = Headline;