import { combineReducers } from "redux";
import errorReducer from "./error.reducer";
import postsReducer from "./survey.reducer";

export default combineReducers({
  errors: errorReducer,
  surveys: postsReducer
});
