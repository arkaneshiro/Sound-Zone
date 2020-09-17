import { combineReducers } from "redux";
import user from "./userReducer";
import auth from "./authReducer";
import sound from "./soundReducer";

export default combineReducers({
    user,
    auth,
    sound,
});
