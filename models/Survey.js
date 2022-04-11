const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SurveySchema = new Schema({
  question: {
    type: String,
    required: true
  },
  varname: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Survey = mongoose.model("survey", SurveySchema);
