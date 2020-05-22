const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    phone: String,
    clients: [
        {
            type: Schema.Types.ObjectId,
            ref: "Client"
        }
    ],
    calendar: {
        type: Array,
        default: []
    },
    settings: {
        type: Schema.Types.ObjectId,
        ref: "Settings"
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});
UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const { _id, firstName, lastName, email } = user;
    const token = jwt.sign({_id, firstName, lastName, email}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
};

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email} );
    if (!user) {
        throw new Error({ error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }

    return user
};
const User = mongoose.model('User', UserSchema);

module.exports = User;
