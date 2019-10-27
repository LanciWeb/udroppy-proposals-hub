const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: Object,
  text: String,
  created_at: Date,
  isDeleted: { type: Boolean, default: false }
});

module.exports = commentSchema;
