const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    name: String,
    date: {
        type: Date,
        default: Date.now
    },
    subdata: []
});

module.exports = mongoose.model("Data", DataSchema);