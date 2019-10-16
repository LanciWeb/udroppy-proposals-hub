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
mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

const app = express();

//# middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// require('../routes');

//#routes
// retrieve all proposals
app.get('/', async (req, res) => {
  const proposals = await Proposal.find({}).sort({ _id: -1 });
  res.send(proposals);
});

// get a specific proposal
app.get('/:id', (req, res) => {
  //TODO get the proposal from db
  const proposal = undefined;
  if (!proposal) return res.status(404).send();
  res.send(proposal);
});

// insert a new proposal
app.post('/', (req, res) => {
  const { title, description } = req.body;
  //TODO add proposal to db
  res.status(200).send();
});

// add like to a proposal
app.post('/:id/like', (req, res) => {
  //TODO get proposal from db
  const proposal = undefined;
  if (!proposal) return res.status(404).send();

  //TODO increment like on db
  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
