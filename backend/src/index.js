//# dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('../models/Proposal');
const Proposal = mongoose.model('proposals');

//#database connection
mongoose.connect(keys.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

//# middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// require('../routes');

//#routes
// retrieve all proposals
app.get('/proposals', async (req, res) => {
  try {
    const proposals = await Proposal.find({}).sort({ _id: -1 });
    res.status(200).send(proposals);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// get a specific proposal
app.get('/proposals/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findOne({ _id: req.params.id });
    if (!proposal) return res.status(404).send();
    res.status(200).send(proposal);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// insert a new proposal
app.post('/proposals', async (req, res) => {
  const { who, what, why } = req.body;
  try {
    await new Proposal({
      who,
      why,
      what,
      likes: 0,
      time: new Date(),
      proposer: 'Anonymus'
    }).save();

    res.status(201).send();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// add like to a proposal
app.patch('/proposals/:id/like', async (req, res) => {
  try {
    const proposal = await Proposal.findOne({ _id: req.params.id });
    if (!proposal) return res.status(404).send();

    proposal.likes += 1;
    await proposal.save();
    res.status(204).send();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
