const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    idCode: {
        type: Number,
        index: true,
        required: true,
        unique: true
    },
    isCompany: Boolean,
    phone: Number,
    company: String,
    address: String,
    data: {
        type: Array,
        default: [],
        subdata: {
            type: Array,
            default: []
        }
    },
    lawyerid: Schema.Types.ObjectId
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = mongoose.model("Client", ClientSchema);
