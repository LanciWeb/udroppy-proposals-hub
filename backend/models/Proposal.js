const mongoose = require('mongoose');
const { Schema } = mongoose;

const proposalSchema = new Schema({
  title: String,
  time: Date,
  likes: Number,
  proposer: String,
  proposerPic: String,
  who: String,
  what: String,
  why: String
});
mongoose.model('proposals', proposalSchema);
