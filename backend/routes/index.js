//#routes
// retrieve all proposals
app.get('/', async (req, res) => {
  const proposals = await Proposal.find({}).sort({ _id: -1 });
  res.send(proposals);
});
