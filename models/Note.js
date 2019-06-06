var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    title: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    body: String,
    created: {
        type: Date,
        default: Date.now

    }
});

var Note = mongoose.model("Note", noteSchema);
module.exports = Note;