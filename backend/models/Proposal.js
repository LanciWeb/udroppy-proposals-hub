const mongoose = require('mongoose');
const { Schema } = mongoose;

const proposalSchema = new Schema({
  time: Date,
  likes: Number,
  proposer: String,
  who: String,
  what: String,
  why: String
});
mongoose.model('proposals', proposalSchema);
