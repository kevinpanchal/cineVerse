import { combineReducers } from "redux";
import foodReducer from "./FoodAndBeverages/reducer";
import cartReducer from "./Cart/reducer";
import contactReducer from "./contact/reducer";
import authReducer from "./Auth/reducer";

const rootReducer = combineReducers({
  foodReducer,
  cartReducer,
  contactReducer,
  authReducer,
});

export default rootReducer;
