const { Schema, Types, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


const reactionSchema = new Schema({
  //reaction id
  reactionId: {
    type: Schema.Types.ObjectId(),
    default: () => new Types.ObjectId,
  },
  //reactionBody
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  //username
  username: {
    type: String,
    required: true,
  },
  //created At
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
});

const thoughtSchema = new Schema({
  //thoughtText
  thoughtText: {
    type: String,
    required: true,
    //minlength:6
    validate: [({ length }) => 1 < length > 280, "Password should be longer."],
  },
  //createdAt
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  //username
  username: {
    type: String,
    required: true,
  },
  //reactions (like replies)
  reactions: [reactionSchema],
});

// ThoughtSchema.virtual that counts the number of reactions

const Thought = model('thought', thoughtSchema);
module.exports = Thought;
