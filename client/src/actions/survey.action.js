import axios from 'axios';

export const listQuestion = () => dispatch => {
  axios.get('/api/survey/questions')
    .then(res => {
      dispatch({ type: "QUESTION_LIST_SET", payload: res.data });
    })
    .catch(error => dispatch({ type: "ERROR_SET", payload: error.response }));
};

export const createSurvey = surveyData => dispatch => {
  axios
    .post('/api/survey/create', surveyData)
    .then(res => {
      console.log('[survey res]', res.data);
      dispatch({ type: "SURVEY_CREATE", payload: res.data });
    })
    .catch(error => dispatch({ type: "ERROR_SET", payload: error.response.data }));
};

export const listSurvey = () => dispatch => {
  axios.get('/api/survey/get')
    .then(res => {
      dispatch({ type: "SURVEY_LIST_SET", payload: res.data });
    })
    .catch(error => dispatch({ type: "ERROR_SET", payload: error.response }));
};

export const deleteSurvey = (surveyId) => dispatch => {
  axios.delete('/api/survey/' + surveyId)
    .then(res => {
      dispatch({ type: "SURVEY_DELETE", payload: surveyId });
    })
    .catch(error => dispatch({ type: "ERROR_SET", payload: error.response }));
};