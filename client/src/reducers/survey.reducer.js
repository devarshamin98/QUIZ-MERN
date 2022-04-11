const initialState = {
  surveys: [],
  questions: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "QUESTION_LIST_SET": {
      return { ...state, questions: action.payload };
    }
    case "SURVEY_CREATE":
      return {
        ...state,
        surveys: [...state.surveys, action.payload]
      };
    case "SURVEY_LIST_SET":
      return {
        ...state,
        surveys: action.payload
      };
    case "SURVEY_DELETE":
      return {
        ...state,
        surveys: state.surveys.filter(el => el._id !== action.payload)
      };
    default:
      return state;
  }
}
