const mongoose = require('mongoose');
require('../models/Proposal');
const Proposal = mongoose.model('proposals');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Set up Auth0 configuration
const authConfig = {
  domain: 'dev-96y5ffbs.eu.auth0.com',
  audience: 'http://localhost:8081'
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-96y5ffbs.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
});

module.exports = app => {
  // retrieve all proposals
  app.get('/proposals', checkJwt, async (req, res) => {
    try {
      const proposals = await Proposal.find({}).sort({ _id: -1 });
      res.status(200).send(proposals);
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  });

  // get a specific proposal
  app.get('/proposals/:id', checkJwt, async (req, res) => {
    try {
      const proposal = await Proposal.findOne({ _id: req.params.id });
      if (!proposal) return res.status(404).send();
      res.status(200).send(proposal);
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  });

  // delete a specific proposal
  app.delete('/proposals/:id', checkJwt, async (req, res) => {
    try {
      const proposal = await Proposal.findOne({ _id: req.params.id });
      if (!proposal) return res.status(404).send();
      if (proposal.user.sub !== req.user.sub) return res.status(401).send();
      await proposal.remove();
      res.status(204).send();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  });

  // insert a new proposal
  app.post('/proposals', checkJwt, async (req, res) => {
    const { who, what, why, title, proposer, user } = req.body;
    console.log(req);
    try {
      await new Proposal({
        who,
        why,
        what,
        user,
        title,
        likes: 0,
        time: new Date()
      }).save();

      res.status(201).send();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  });

  // add like to a proposal
  app.patch('/proposals/:id/like', checkJwt, async (req, res) => {
    try {
      const proposal = await Proposal.findOne({ _id: req.params.id });
      if (!proposal) return res.status(404).send();
      proposal.likes += 1;
      await proposal.save();
      res.status(200).send({ likes: proposal.likes });
    } catch (e) {
      console.error(e);
    }
  });
};
