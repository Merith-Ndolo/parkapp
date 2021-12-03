import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import parkingReducer from "./parkingReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  userReducer,
  usersReducer,
  parkingReducer,
  errorReducer,
});
