import { put, takeLatest } from "redux-saga/effects";
import {
  SET_USER_LOADING,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
  SET_USER,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
} from "./actionTypes";
import axios from "../../utils/axios";

function* setUserSaga({ payload }) {
  try {
    yield put({ type: SET_USER_LOADING });
    const { data } = yield axios.post("/user/login", payload);
    if (data.success) {
      yield put({
        type: SET_USER_SUCCESS,
        payload: data.data,
      });
    } else {
      yield put({ type: SET_USER_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: SET_USER_FAIL, message: "Invalid Email or password" });
  }
}

function* removeUserSaga() {
  yield put({
    type: REMOVE_USER_SUCCESS,
  });
}

function* userSaga() {
  yield takeLatest(SET_USER, setUserSaga);
  yield takeLatest(REMOVE_USER, removeUserSaga);
}

export default userSaga;
