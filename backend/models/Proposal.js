const mongoose = require('mongoose');
const { Schema } = mongoose;
const { CommentSchema } = require('./Comment');

const proposalSchema = new Schema({
  time: Date,
  why: String,
  who: String,
  what: String,
  user: Object,
  likes: Number,
  title: String,
  comments: [CommentSchema]
});

mongoose.model('proposals', proposalSchema);
