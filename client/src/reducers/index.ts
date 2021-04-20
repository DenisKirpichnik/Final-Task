import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import alert from "./alert";
import client from "./client";
import project from "./project";
export default combineReducers({
  auth,
  profile,
  alert,
  client,
  project,
});
