import { all } from "redux-saga/effects";
import foodSaga from "./FoodAndBeverages/saga";
import contactSaga from "./contact/saga";
import userSaga from "./Auth/saga";

function* rootSaga() {
  yield all([foodSaga(), contactSaga(), userSaga()]);
}

export default rootSaga;
