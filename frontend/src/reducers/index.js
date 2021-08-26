import { combineReducers } from "redux";
import todos from "./todos";
import tabs from "./tabs";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  todos,
  errors,
  tabs,
  messages,
  auth,
  loadingBar: loadingBarReducer,
});
