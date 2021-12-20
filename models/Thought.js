const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
  //reaction id
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
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

const ThoughtSchema = new Schema({
  //thoughtText
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
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
    ref:'User'
  },
  //reactions (like replies)
  reactions: [ReactionSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

// ThoughtSchema.virtual that counts the number of reactions

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;
