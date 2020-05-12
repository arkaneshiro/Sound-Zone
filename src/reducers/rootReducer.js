import { combineReducers } from "redux";
import user from "./userReducer";
import auth from "./authReducer";

export default combineReducers({
  user,
  auth,
});
