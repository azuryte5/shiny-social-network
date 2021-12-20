const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
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
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    //friends
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    
});

// UserSchema.virtual that counts the number of friends
const User = model('User', UserSchema);

module.exports = User;



