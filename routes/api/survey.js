const express = require("express");
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');

const Survey = require("../../models/Survey");

const importCSV = (filename) => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filename)
    .pipe(csv())
    .on('data', row => {
      data.push(row);
    })
    .on('end', () => {
      resolve(data.sort(() => 0.5 - Math.random()).slice(0, 10));
    });
  })
}

router.get('/questions', async (req, res) => {
  const data = await importCSV('data.csv');
  return res.status(200).json(data);
});

router.post("/create", async (req, res) => {
  console.log('[creating...]');
  const { question, varname, answer, duration } = req.body;

  const is_exist = await Survey.findOne({ question });
  if (is_exist) return res.status(422).json('Survey already exist with same question');

  try {
    const newSurvey = new Survey({ question, varname, answer, duration });
    const result = await newSurvey.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log('[create error]', error);
    return res.status(422).json("Data can't process!");
  }
});

router.get('/get', async (req, res) => {
  const surveys = await Survey.find();
  return res.status(200).json(surveys);
});

router.get('/getById/:surveyId', async (req, res) => {
  const surveyId = req.params.surveyId;
  const survey = await Survey.findOne({ _id: surveyId });
  return res.status(200).json(survey);
});

router.delete('/:surveyId', async (req, res) => {
  const surveyId = req.params.surveyId;
  const survey = await Survey.deleteOne({ _id: surveyId });
  return res.status(200).json(survey);
});

module.exports = router;