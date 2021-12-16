const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema({
    //username
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
    // email
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Not valid']
    },
    //thoughts
    thoughts:[thoughtSchema],
    friends:[UserSchema]
    

    //friends
});

// UserSchema.virtual that counts the number of friends
const User = model('User', userSchema);

module.exports = User;



