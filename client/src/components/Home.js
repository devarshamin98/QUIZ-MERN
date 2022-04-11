import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSurvey, listSurvey, listQuestion } from "../actions/survey.action";
import Question from "./Question";

const Landing = () => {

  const dispatch = useDispatch();
  const { surveys, questions } = useSelector(state => state.surveys);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(listSurvey());
    dispatch(listQuestion());
  }, []);

  useEffect(() => {
    setTotal(questions.length);
  }, [questions.length]);

  const onSubmit = (question, varname, answer, duration) => {
    console.log('[submiting]', question, varname, answer, duration);
    setPage(page + 1);
    dispatch(createSurvey({ question, varname, answer, duration }));
  };

  const convertArrayOfObjectsToCSV = (array) => {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  const onExport = (filename) => {
    const link = document.createElement('a');

    const csvData = surveys.map(v => ({
      question: `"${v.question}"`,
      answer: v.answer,
      'duration (s)': v.duration,
      created: v.created
    }));

    let csv = convertArrayOfObjectsToCSV(csvData);
    if (csv == null) return;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  };

  const currQuestion = page < questions.length ? questions[page] : null;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Survey</h1>
      <button className="btn btn-info my-3" onClick={() => onExport('result')}>Export CSV</button>
      <h5>{page < total ? page + 1 : total} / {total}</h5>
      <div className="row">
        {
          currQuestion && <Question key={currQuestion.varname} {...currQuestion} onSubmit={onSubmit} />
        }
        {
          page == total && <h1 className="mt-5">Thanks for your survey!</h1>
        }
      </div>
    </div>
  );
};

export default Landing;
