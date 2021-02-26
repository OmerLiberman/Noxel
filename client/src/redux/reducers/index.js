import { combineReducers } from "redux";
import { mealsReducer } from "./meals";
import { sidesReducer } from "./sides";
import { authReducer } from "./auth";
import { statsReducer } from "./stats";

export default combineReducers({
  meals: mealsReducer,
  sides: sidesReducer,
  auth: authReducer,
  stats: statsReducer,
});
