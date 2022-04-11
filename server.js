const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const survey = require('./routes/api/survey');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect( 'mongodb://localhost:27017/mfq', { useNewUrlParser: true } )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/survey', survey) 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
