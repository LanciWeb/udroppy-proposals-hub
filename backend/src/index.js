//# dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('../config/keys');

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

//#routes
require('../routes')(app);

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
